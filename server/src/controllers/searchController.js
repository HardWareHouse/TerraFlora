import Produit from '../modelsSQL/Produit.js';
import Image from '../modelsSQL/Image.js';
import { Op } from 'sequelize';
import validator from 'validator';
import path from 'path';

// Helper pour corriger l'url correcte de l'image
const generateImageUrl = (filename) => {
  return `uploads/${filename}`;
};

// Lire les informations d'un produit
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }
    const product = await Produit.findByPk(id, { include: Image });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les produits
export const getAllProducts = async (req, res) => {
  try {
    const products = await Produit.findAll({ include: Image });

    // Transform image URLs
    const productsWithImageUrls = products.map(product => {
      const transformedImages = product.Images.map(image => ({
        ...image.toJSON(),
        imageUrl: generateImageUrl(path.basename(image.imageUrl))
      }));
      return {
        ...product.toJSON(),
        Images: transformedImages
      };
    });

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un produit
export const createProduct = async (req, res) => {
  const transaction = await Produit.sequelize.transaction();
  try {
    const { nom, description, prix, stock, marque, couleur, taille, isPromotion, pourcentagePromotion, categorieId } = req.body;
    const product = await Produit.create({ nom, description, prix, stock, marque, couleur, taille, isPromotion, pourcentagePromotion, categorieId }, { transaction });

    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => ({
        produitId: product.id,
        imageUrl: file.filename // Just the filename
      }));
      await Image.bulkCreate(images, { transaction });
    }

    await transaction.commit();

    const productWithImages = await Produit.findByPk(product.id, { include: Image });
    const transformedImages = productWithImages.Images.map(image => ({
      ...image.toJSON(),
      imageUrl: generateImageUrl(path.basename(image.imageUrl))
    }));
    const transformedProduct = {
      ...productWithImages.toJSON(),
      Images: transformedImages
    };

    res.status(201).json(transformedProduct);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  const transaction = await Produit.sequelize.transaction();
  try {
    const { id } = req.params;
    const { nom, description, prix, stock, marque, couleur, taille, isPromotion, pourcentagePromotion, categorieId } = req.body;
    const product = await Produit.findByPk(id);

    if (product) {
      product.nom = nom || product.nom;
      product.description = description || product.description;
      product.prix = prix || product.prix;
      product.stock = stock || product.stock;
      product.marque = marque || product.marque;
      product.couleur = couleur || product.couleur;
      product.taille = taille || product.taille;
      product.isPromotion = isPromotion || product.isPromotion;
      product.pourcentagePromotion = pourcentagePromotion || product.pourcentagePromotion;
      product.categorieId = categorieId || product.categorieId;
      await product.save({ transaction });

      if (req.files && req.files.length > 0) {
        const images = req.files.map(file => ({
          produitId: product.id,
          imageUrl: file.filename // Just the filename
        }));
        await Image.bulkCreate(images, { transaction });
      }

      await transaction.commit();

      const productWithImages = await Produit.findByPk(product.id, { include: Image });
      const transformedImages = productWithImages.Images.map(image => ({
        ...image.toJSON(),
        imageUrl: generateImageUrl(path.basename(image.imageUrl))
      }));
      const transformedProduct = {
        ...productWithImages.toJSON(),
        Images: transformedImages
      };

      res.status(200).json(transformedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const product = await Produit.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(200).json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Rechercher les produits filtrés
export const getFilteredProducts = async (req, res) => {
  try {
    const { categorie, marque, couleur, taille, search } = req.query;

    const whereClause = {};

    if (categorie) whereClause.categorieId = categorie;
    if (marque) whereClause.marque = marque;
    if (couleur) whereClause.couleur = couleur;
    if (taille) whereClause.taille = taille;

    if (search) {
      whereClause[Op.or] = [
        { nom: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const products = await Produit.findAll({ where: whereClause, include: Image });

    // Transform image URLs
    const productsWithImageUrls = products.map(product => {
      const transformedImages = product.Images.map(image => ({
        ...image.toJSON(),
        imageUrl: generateImageUrl(path.basename(image.imageUrl))
      }));
      return {
        ...product.toJSON(),
        Images: transformedImages
      };
    });

    res.status(200).json(productsWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
