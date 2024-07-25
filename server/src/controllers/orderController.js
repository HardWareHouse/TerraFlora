import * as orderService from "../services/orderService.js";
import { createInvoice } from "../services/invoiceService.js";
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

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une commande
export const createOrder = async (req, res) => {
  const { total, userId, productArray, invoiceUrl } = req.body;
  const user = req.user;

  if (!userId || !productArray || !total || !invoiceUrl) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid UUID format" });
  }

  if (userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const order = await orderService.createOrder({ total, userId, productArray });
    if (!order) {
      return res.status(404).json({ error: "Order not created" });
    }

    const invoice = await createInvoice({ 
          numero: order.numero, 
          total: order.total, 
          userId, 
          commandeId: order.id,
          invoiceUrl
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not created" });
    }
    
    return res.status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// Doit être mis à jour 
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { total, userId, productArray } = req.body;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing order ID" });
  }

  if (!userId || !total) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid UUID format" });
  }

  if (userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updatedOrder = await orderService.updateOrderById(id, { total, userId, productArray });
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not updated" });
    }
    res.status(200).json(updatedOrder);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Doit être mis à jour 
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

    await orderService.deleteOrderById(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
