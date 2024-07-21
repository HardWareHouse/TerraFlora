import CommandeSQL from "../modelsSQL/Commande.js";
import CommandeMongo from "../modelsMongo/Commande.mongo.js";

const getOrderWithAlias = async (id) => {
  return await CommandeMongo.aggregate([
    { $match: { _id: id } },
    {
      $project: {
        id: '$_id',
        numero: 1,
        statut: 1,
        dateCommande: 1,
        dateLivraisonFinale: 1,
        total: 1,
        trackingNumber: 1,
        user: 1,
        _id: 0
      }
    }
  ]).then(results => results[0] || null);
};

export const createOrder = async (data) => {
  return await CommandeSQL.create(data);
};

export const getOrderById = async (id) => {
  return getOrderWithAlias(id);
};

export const getOrdersByUserId = async (userId) => {
  return await CommandeMongo.aggregate([
    { $match: { 'user._id': userId } },
    {
      $project: {
        id: '$_id',
        numero: 1,
        statut: 1,
        dateCommande: 1,
        dateLivraisonFinale: 1,
        total: 1,
        trackingNumber: 1,
        user: 1,
        _id: 0,
      }
    }
  ]);
};


export const getAllOrders = async () => {
  return await CommandeMongo.find().select({
    id: '$_id',
    numero: 1,
    statut: 1,
    dateCommande: 1,
    dateLivraisonFinale: 1,
    total: 1,
    trackingNumber: 1,
    user: 1,
    _id: 0
  }); 
};

export const updateOrderById = async (id, data) => {
  const order = await CommandeSQL.findByPk(id);
  if (order) {
    return await order.update(data);
  }
  return null;
};

export const deleteOrderById = async (id) => {
  const order = await CommandeSQL.findByPk(id);
  if (order) {
    await order.destroy();
    return order;
  }
  return null;
};
