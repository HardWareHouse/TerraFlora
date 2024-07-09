import Commande from "../modelsSQL/Commande.js";

export const createOrder = async (data) => {
  return await Commande.create(data);
};

export const getOrderById = async (id) => {
  return await Commande.findByPk(id);
};

export const getOrdersByUserId = async (userId) => {
  return await Commande.findAll({
    where: { userId },
    attributes: { exclude: ["createdAt", "updatedAt", "userId", "panierId"] },
  });
};

export const getAllOrders = async () => {
  return await Commande.findAll();
};

export const updateOrderById = async (id, data) => {
  const order = await Commande.findByPk(id);
  if (order) {
    return await order.update(data);
  }
  return null;
};

export const deleteOrderById = async (id) => {
  const order = await Commande.findByPk(id);
  if (order) {
    await order.destroy();
    return order;
  }
  return null;
};
