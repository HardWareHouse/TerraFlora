import CommandeSQL from "../modelsSQL/Commande.js";
import User from "../modelsSQL/User.js";
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
        productArray: 1,
        user: 1,
        _id: 0
      }
    }
  ]).then(results => results[0] || null);
};

export const createOrder = async (data) => {
  const { total, userId, productArray } = data;

  const numero = await generateRandomAndUniqueOrderNumber();
  const statut = 'En cours de traitement';
  const dateCommande = new Date();
  const dateLivraisonFinale = null;
  const trackingNumber = null;

  const orderSQL = await CommandeSQL.create({ numero, statut, dateCommande, dateLivraisonFinale,
    trackingNumber, total, productArray, userId });

  if (!orderSQL) throw new Error('Order not created');

  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const orderMongo = await CommandeMongo.create({
    _id: orderSQL.id,
    numero,
    statut,
    dateCommande,
    dateLivraisonFinale,
    total,
    trackingNumber,
    productArray: productArray.map(product => ({
      _id: product.id,
      nom: product.nom,
      prix: product.prix,
      quantite: product.quantite
    })),
    user: {
      _id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email
    }
  });

  if (!orderMongo) throw new Error('Order not created');
  return await getOrderWithAlias(orderSQL.id);
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

// Doit être mis à jour 
export const updateOrderById = async (id, data) => {
  const order = await CommandeSQL.findByPk(id);
  if (order) {
    await order.update(data);
    const orderMongo = await CommandeMongo.findById(id);
    if (orderMongo) {
      await orderMongo.update(data);
      return await getOrderWithAlias(id);
    }
  }
  return null;
};

// Doit être mis à jour 
export const deleteOrderById = async (id) => {
  const order = await CommandeSQL.findByPk(id);
  const orderMongo = await CommandeMongo.findById(id);
  if (order) {
    await order.destroy();
    if (orderMongo) {
      await orderMongo.destroy();
      return true;
    }
  }
  return null;
};

const generateRandomAndUniqueOrderNumber = async () => {
  let numero = Math.floor(Math.random() * 1000000).toString();
  while (await CommandeSQL.findOne({ where: { numero } })) {
    numero = Math.floor(Math.random() * 1000000).toString();
  }
  return numero;
}
