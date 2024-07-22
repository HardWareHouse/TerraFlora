import Panier from '../modelsSQL/Panier.js';
import Produit from '../modelsSQL/Produit.js';
import Image from '../modelsSQL/Image.js';
import { isValidUUID } from "../helpers/validatorHelper.js";

// Lire les informations d'un panier
export const getCart = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing cart ID" });
  }

  try {
    const cart = await Panier.findOne({
      where: { userId: id },
      include: [
        {
          model: Produit,
          through: { attributes: ['quantity'] },
          include: [Image],
        }
      ]
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (cart.userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Créer un panier
export const createCart = async (req, res) => {
  const { userId, produits } = req.body;
  const user = req.user;

  if (!userId || !produits || !Array.isArray(produits)) {
    return res.status(400).json({ error: "User ID and products are required" });
  }

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid UUID format" });
  }

  if (userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const existingCart = await Panier.findOne({ where: { userId } });
    if (existingCart) {
      return res.status(409).json({ error: "User already has a cart" });
    }

    const newCart = await Panier.create({ userId });

    for (let produit of produits) {
      const produitInstance = await Produit.findByPk(produit.id);
      if (produitInstance) {
        await newCart.addProduit(produitInstance, { through: { quantity: produit.quantity } });
      }
    }

    const cartWithProducts = await Panier.findByPk(newCart.id, {
      include: [{ model: Produit, through: { attributes: ['quantity'] } }]
    });

    res.status(201).json(cartWithProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un panier ou ajouter un produit à un panier existant
// Mettre à jour un panier ou ajouter un produit à un panier existant
export const updateCart = async (req, res) => {
  const { userId, produits } = req.body;
  const user = req.user;

  if (!userId || !isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  if (!produits || !Array.isArray(produits)) {
    return res.status(400).json({ error: "Products are required" });
  }

  if (userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    let cart = await Panier.findOne({ where: { userId }, include: [Produit] });

    if (!cart) {
      // Créer un nouveau panier si l'utilisateur n'en a pas
      cart = await Panier.create({ userId });
    }

    if (cart.userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Ajouter ou mettre à jour les produits au panier
    for (let produit of produits) {
      const produitInstance = await Produit.findByPk(produit.id);
      if (produitInstance) {
        const cartProduct = await cart.getProduits({ where: { id: produit.id } });
        if (cartProduct.length > 0) {
          // Produit déjà présent, mise à jour de la quantité
          let currentQuantity = cartProduct[0].Panier_Produits.quantity;
          await cart.addProduit(produitInstance, { through: { quantity: produit.quantity } });
        } else {
          // Produit non présent, ajout au panier avec quantité spécifiée
          await cart.addProduit(produitInstance, { through: { quantity: produit.quantity } });
        }
      }
    }

    const updatedCart = await Panier.findByPk(cart.id, {
      include: [{ model: Produit, through: { attributes: ['quantity'] } }]
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un panier
export const deleteCart = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing cart ID" });
  }

  try {
    const cart = await Panier.findByPk(id);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (cart.userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await cart.destroy();
    res.status(204).json({ error: "Panier supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un produit d'un panier
export const deleteProductFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  const user = req.user;

  if (!userId || !isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  if (userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (!productId || !isValidUUID(productId)) {
    return res.status(400).json({ error: "Invalid or missing product ID" });
  }

  try {
    const cart = await Panier.findOne({
      where: { userId },
      include: [Produit]
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (cart.userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const product = await Produit.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await cart.removeProduit(product);

    const updatedCart = await Panier.findOne({
      where: { userId },
      include: [{ model: Produit, through: { attributes: [] } }]
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
