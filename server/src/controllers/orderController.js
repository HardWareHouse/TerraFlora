import * as orderService from "../services/orderService.js";
import { isValidUUID } from "../helpers/validatorHelper.js";

// Lire les informations d'une commande
export const getOrder = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing order ID" });
  }

  try {
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user._id !== user.id && user.role !== "ROLE_ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire toutes les commandes
export const getAllOrders = async (req, res) => {
  const user = req.user;

  try {
    if (user.role === "ROLE_ADMIN") {
      const orders = await orderService.getAllOrders();
      if (!orders) {
        return res.status(404).json({ error: "Orders not found" });
      }
      return res.status(200).json(orders);
    } else {
      const orders = await orderService.getOrdersByUserId(user.id);
      if (!orders) {
        return res.status(404).json({ error: "Orders not found" });
      }
      return res.status(200).json(orders);
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une commande
export const createOrder = async (req, res) => {
  const { userId, panierId, total } = req.body;
  const user = req.user;

  if (!userId || !panierId || !total) {
    return res.status(400).json({ error: "User ID, Cart ID and Total are required" });
  }

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid UUID format" });
  }

  if (userId !== user.id && user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const existingOrder = await orderService.getOrderByPanierId(panierId);
    if (existingOrder) {
      return res.status(409).json({ error: "Order already exists" });
    }

    const numero = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    const dateCommande = new Date();
    const dateLivraisonPrevue = new Date(dateCommande);
    const dateLivraisonFinale = new Date(dateCommande);
    dateLivraisonPrevue.setDate(dateLivraisonPrevue.getDate() + 7);
    dateLivraisonFinale.setDate(dateLivraisonFinale.getDate() + 10);
    const statut = "En attente";

    const newOrder = await orderService.createOrder(
      userId,
      panierId,
      numero,
      statut,
      dateCommande,
      total,
      dateLivraisonPrevue,
      dateLivraisonFinale
    );
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une commande
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userId, panierId, total } = req.body;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing order ID" });
  }

  if (!userId || !panierId || !total) {
    return res.status(400).json({ error: "User ID, Cart ID and Total are required" });
  }

  try {
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user._id !== user.id && user.role !== "ROLE_ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedOrder = await orderService.updateOrderById(id, { userId, panierId, total });
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une commande
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing order ID" });
  }

  try {
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user._id !== user.id && user.role !== "ROLE_ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const deletedOrder = await orderService.deleteOrderById(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
