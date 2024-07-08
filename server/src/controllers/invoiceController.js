import Facture from "../modelsSQL/Facture.js";
import validator from "validator";

// Lire les informations d'une facture
export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Invoice ID is required" });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const invoice = await Facture.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire les informations de plusieurs factures par l'ID de l'utilisateur
export const getInvoiceByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ error: "User ID is required" });
        }
        if (!validator.isUUID(id)) {
        return res.status(400).json({ error: "Invalid UUID format" });
        }

        const invoices = await Facture.findAll({ 
          where: { userId: id },
          attributes: { exclude: ["createdAt", "updatedAt", "userId"] }
        });
        if (!invoices || invoices.length === 0) {
          return res.status(404).json({ error: "Invoices not found" });
        }

        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire toutes les factures
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Facture.findAll();
    if (!invoices) {
      return res.status(404).json({ error: "Invoices not found" });
    }
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une facture
export const createInvoice = async (req, res) => {
  try {
    const { userId, panierId, total } = req.body;
    if (!userId || !panierId || !total) {
      return res.status(400).json({ error: "User ID, Cart ID and Total are required" });
    }

    const newInvoice = await Facture.create({ userId, panierId, total });
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une facture
export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Invoice ID is required" });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const invoice = await Facture.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const updatedInvoice = await invoice.update(req.body);
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une facture
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Invoice ID is required" });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const invoice = await Facture.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    await invoice.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
