import FactureSQL from "../modelsSQL/Facture.js";
import FactureMongo from "../modelsMongo/Facture.mongo.js";
import User from "../modelsSQL/User.js";
import Commande from "../modelsSQL/Commande.js";

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
  const {numero, total, userId, commandeId, incoiceUrl} = data;
  const statutPaiement = 'Payée';
  const dateFacturation = new Date();
  const datePaiementDue = null;

  const invoiceSQL = await FactureSQL.create({numero, statutPaiement, dateFacturation, 
    datePaiementDue, total, userId, commandeId, incoiceUrl});

  if (!invoiceSQL) throw new Error('Invoice not created');

  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const commande = await Commande.findByPk(commandeId);
  if (!commande) throw new Error('Commande not found');

  const invoiceMongo = await FactureMongo.create({
    _id: invoiceSQL.id,
    numero,
    statutPaiement,
    dateFacturation,
    datePaiementDue,
    total,
    incoiceUrl,
    user: {
      _id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email
    },
    commande: {
      numero: commande.numero,
    }
  });

  if(!invoiceMongo) throw new Error('Invoice not created');
  return await getFactureWithAlias(invoiceSQL.id);
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
    const {numero, statutPaiement, dateFacturation, datePaiementDue, total, userId, commandeId} = data;
    invoice.numero = numero || invoice.numero;
    invoice.statutPaiement = statutPaiement || invoice.statutPaiement;
    invoice.dateFacturation = dateFacturation || invoice.dateFacturation;
    invoice.datePaiementDue = datePaiementDue || invoice.datePaiementDue;
    invoice.total = total || invoice.total;
    invoice.userId = userId || invoice.userId;
    invoice.commandeId = commandeId || invoice.commandeId;
    await invoice.save();

    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const commande = await Commande.findByPk(commandeId);
    if (!commande) throw new Error('Commande not found');

    const invoiceMongo = await FactureMongo.findByIdAndUpdate(id, {
      numero: invoice.numero,
      statutPaiement: invoice.statutPaiement,
      dateFacturation: invoice.dateFacturation,
      datePaiementDue: invoice.datePaiementDue,
      total: invoice.total,
      user: {
        _id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email
      },
      commande: {
        numero: commande.numero,
      }
    }, { new: true });

    if (!invoiceMongo) throw new Error('Invoice not updated');
    return await getFactureWithAlias(id);
  }
  return null;
};

export const deleteInvoiceById = async (id) => {
  const invoice = await FactureSQL.findByPk(id);
  if (invoice) {
    await invoice.destroy();
    return await FactureMongo.findByIdAndDelete(id);
  }
  return null;
};
