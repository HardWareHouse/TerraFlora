import { isValidUUID } from "../helpers/validatorHelper.js";
import * as contactService from "../services/contactService.js";
import { getUserByEmail } from "../services/userService.js";

// Lire les informations d'un contact
export const getContact = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing contact ID" });
  }

  try {
    const contact = await contactService.getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    if (contact.userId !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire les informations d'un contact par l'ID de l'utilisateur
export const getContactByUserId = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  if (user.id !== id) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const contact = await contactService.getContactByUserId(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    if (contact.userId !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les contacts
export const getAllContacts = async (req, res) => {
  const user = req.user;

  if (user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const contacts = await contactService.getAllContacts();
    if (!contacts) {
      return res.status(404).json({ error: "Contacts not found" });
    }

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un contact
export const createContact = async (req, res) => {
    const { subject, message, email, userId } = req.body;
    const user = req.user;

    if (!subject || !message || !email || !userId) {
      return res.status(400).json({ error: "Missing required information" });
    }

    if (user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const existingUserWithMaill = await getUserByEmail(email);
    if(existingUserWithMaill && existingUserWithMaill.id !== user.id) return res.status(403).json({ error: "Unauthorized" });

    try {
      const contact = await contactService.createContact({
          subject,
          message,
          email,
          userId
      });

      if (!contact) return res.status(400).json({ error: "Contact not created" });
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un contact
export const updateContact = async (req, res) => {
    const { id } = req.params;
    const { subject, message, email, response } = req.body;

    if (!subject || !message || !email || !response) {
        return res.status(400).json({ error: "Missing required information" });
    }

    const user = req.user;

    if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing contact ID" });
    }

    try {
        const existingContact = await contactService.getContactById(id);
        if (!existingContact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        if (user.id !== existingContact.userId && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

        const contact = await contactService.updateContact(id, data);
        if (!contact) return res.status(400).json({ error: "Contact not updated" });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un contact
export const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing contact ID" });
    }

    try {
        const existingContact = await contactService.getContactById(id);
        if (!existingContact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        if (user.id !== existingContact.userId && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

        const deletedContact = await contactService.deleteContact(id);
        if (!deletedContact) return res.status(400).json({ error: "Contact not deleted" });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
