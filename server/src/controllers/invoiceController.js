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
    if (invoice.user._id !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire toutes les factures
export const getAllInvoices = async (req, res) => {
  const user = req.user;

  try {
    if (user.role === "ROLE_ADMIN") {
      const invoices = await invoiceService.getAllInvoices();
      if (!invoices) {
        return res.status(404).json({ error: "Invoices not found" });
      }
      return res.status(200).json(invoices);
    } else {
      const invoices = await invoiceService.getInvoicesByUserId(user.id);
      if (!invoices) {
        return res.status(404).json({ error: "Invoices not found" });
      }
      return res.status(200).json(invoices);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Doit être mis à jour 
export const createInvoice = async (req, res) => {
  const { numero, userId, commandeId, total, invoiceUrl } = req.body;
  const user = req.user;

  if (!numero || !userId || !commandeId || !total || !invoiceUrl) {
    return res.status(400).json({ error: "User ID, Cart ID and Total are required" });
  }

  if (userId !== user.id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const invoice = await invoiceService.createInvoice({ numero, userId, commandeId, total, invoiceUrl });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Doit être mis à jour 
export const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { numero, statutPaiement, dateFacturation, datePaiementDue, total, invoiceUrl } = req.body;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing invoice ID" });
  }

  try {
    const invoice = await invoiceService.getInvoiceById(id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    if (invoice.user._id !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

    const updatedInvoice = await invoiceService.updateInvoiceById(id, { numero, statutPaiement, dateFacturation, datePaiementDue, total, invoiceUrl });
    if (!updatedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Doit être mis à jour 
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

    if (invoice.user._id !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

    const deletedInvoice = await invoiceService.deleteInvoiceById(id);
    if (!deletedInvoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
