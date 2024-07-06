import Commande from '../modelsSQL/Commande.js';
import validator from 'validator';

// Lire les informations d'une commande
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }

    const order = await Commande.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire les informations d'une commande par l'ID de l'utilisateur
export const getOrdersByUserId = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      if (!validator.isUUID(id)) {
        return res.status(400).json({ error: 'Invalid UUID format' });
      }
  
      const orders = await Commande.findAll({
        where: { userId: id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'userId', 'panierId'] },
      });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: 'Orders not found' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: error.message });
    }
  };
  

// Lire toutes les commandes
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Commande.findAll();
    if (!orders) {
      return res.status(404).json({ error: 'Orders not found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une commande
export const createOrder = async (req, res) => {
  try {
    const order = await Commande.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une commande
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }

    const order = await Commande.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une commande
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }

    const order = await Commande.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

