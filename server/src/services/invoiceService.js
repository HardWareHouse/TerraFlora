import Facture from "../modelsSQL/Facture.js";

export const createInvoice = async (data) => {
  return await Facture.create(data);
};

export const getInvoiceById = async (id) => {
  return await Facture.findByPk(id);
};

export const getInvoicesByUserId = async (userId) => {
  return await Facture.findAll({
    where: { userId },
    attributes: { exclude: ["createdAt", "updatedAt", "userId"] }
  });
};

export const getAllInvoices = async () => {
  return await Facture.findAll();
};

export const updateInvoiceById = async (id, data) => {
  const invoice = await Facture.findByPk(id);
  if (invoice) {
    return await invoice.update(data);
  }
  return null;
};

export const deleteInvoiceById = async (id) => {
  const invoice = await Facture.findByPk(id);
  if (invoice) {
    await invoice.destroy();
    return invoice;
  }
  return null;
};
