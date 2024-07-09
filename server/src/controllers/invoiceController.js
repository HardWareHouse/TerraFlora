import * as invoiceService from "../services/invoiceService.js";
import { isValidUUID } from "../helpers/validatorHelper.js";

// Lire les informations d'une facture
export const getInvoice = async (req, res) => {
  const { id } = req.params;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing invoice ID" });
  }

  try {
    const invoice = await invoiceService.getInvoiceById(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const user = req.user;
    if (invoice.userId !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire les informations de plusieurs factures par l'ID de l'utilisateur
export const getInvoiceByUserId = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  if (user.id !== id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const invoices = await invoiceService.getInvoicesByUserId(id);
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
  const user = req.user;

  if (user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const invoices = await invoiceService.getAllInvoices();
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
    const numero = Math.floor(Math.random() * 1000000).toString();
    const dateFacturation = new Date();
    const datePaiementDue = new Date();
    datePaiementDue.setDate(datePaiementDue.getDate() + 30);
    const statutPaiement = "En attente";

    newInvoice = await invoiceService.createInvoice({
      userId,
      numero,
      dateFacturation,
      datePaiementDue,
      statutPaiement,
      total
    });
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une facture
export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { userId, panierId, total } = req.body;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing invoice ID" });
  }

  if (!userId || !panierId || !total) {
    return res.status(400).json({ error: "User ID, Cart ID and Total are required" });
  }

  try {
    const invoice = await invoiceService.getInvoiceById(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    if (invoice.userId !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });
    
    const updatedInvoice = await invoiceService.updateInvoiceById(id, { userId, panierId, total });
    if (!updatedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une facture
export const deleteInvoice = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing invoice ID" });
  }

  try {
    const invoice = await invoiceService.getInvoiceById(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    if (invoice.userId !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });
    
    const deletedInvoice = await invoiceService.deleteInvoiceById(id);
    if (!deletedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
