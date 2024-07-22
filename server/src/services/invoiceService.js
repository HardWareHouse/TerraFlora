import FactureSQL from "../modelsSQL/Facture.js";
import FactureMongo from "../modelsMongo/Facture.mongo.js";

const getFactureWithAlias = async (id) => {
  return await FactureMongo.aggregate([
    { $match: { _id: id } },
    {
      $project: {
        id: '$_id',
        numero: 1,
        statutPaiement: 1,
        dateFacturation: 1,
        datePaiementDue: 1,
        total: 1,
        user: 1,
        _id: 0
      }
    }
  ]).then(results => results[0] || null);
};

export const createInvoice = async (data) => {
  return await FactureSQL.create(data);
};

export const getInvoiceById = async (id) => {
  return getFactureWithAlias(id);
};

export const getInvoicesByUserId = async (userId) => {
  return await FactureMongo.aggregate([
    { $match: { 'user._id': userId } },
    {
      $project: {
        id: '$_id',
        numero: 1,
        statutPaiement: 1,
        dateFacturation: 1,
        datePaiementDue: 1,
        total: 1,
        user: 1,
        _id: 0,
      }
    }
  ]);
};

export const getAllInvoices = async () => {
  return await FactureMongo.find().select({
    id: '$_id',
    numero: 1,
    statutPaiement: 1,
    dateFacturation: 1,
    datePaiementDue: 1,
    total: 1,
    user: 1,
    commande: 1,
    _id: 0,
  });
};

export const updateInvoiceById = async (id, data) => {
  const invoice = await FactureSQL.findByPk(id);
  if (invoice) {
    return await invoice.update(data);
  }
  return null;
};

export const deleteInvoiceById = async (id) => {
  const invoice = await FactureSQL.findByPk(id);
  if (invoice) {
    await invoice.destroy();
    return invoice;
  }
  return null;
};
