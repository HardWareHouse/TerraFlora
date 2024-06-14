import Produit from '../modelsSQL/Produit.js';
import { Op } from 'sequelize';
import validator from 'validator';

// Lire les informations d'un produit
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }
    const product = await Produit.findByPk(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les produits
export const getAllProducts = async (req, res) => {
  try {
    const products = await Produit.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un produit
export const createProduct = async (req, res) => {
  try {
    const product = await Produit.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const { nom, description, prix, stock, marque, isPromotion, pourcentagePromotion, categorieId } = req.body;
    const product = await Produit.findByPk(req.params.id);
    if (product) {
      product.nom = nom || product.nom;
      product.description = description || product.description;
      product.prix = prix || product.prix;
      product.stock = stock || product.stock;
      product.marque = marque || product.marque;
      product.isPromotion = isPromotion || product.isPromotion;
      product.pourcentagePromotion = pourcentagePromotion || product.pourcentagePromotion;
      product.categorieId = categorieId || product.categorieId;
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
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

    const products = await Produit.findAll({ where: whereClause });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
