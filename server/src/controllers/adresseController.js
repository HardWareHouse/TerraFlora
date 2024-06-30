import Adresse from "../modelsSQL/Adresse.js";
import validator from "validator";

// Lire les informations d'une adresse
export const getAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Address ID is required" });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const address = await Adresse.findByPk(id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire les informations d'une adresse par l'ID de l'utilisateur
export const getAddressByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ error: "User ID is required" });
        }
        if (!validator.isUUID(id)) {
        return res.status(400).json({ error: "Invalid UUID format" });
        }

        const address = await Adresse.findOne({ 
          where: { userId: id },
          attributes: { exclude: ["createdAt", "updatedAt", "userId"] }
        });
        if (!address) {
          return res.status(404).json({ error: "Address not found" });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire toutes les adresses
export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Adresse.findAll();
    if (!addresses) {
      return res.status(404).json({ error: "Addresses not found" });
    }

    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Créer une adresse
export const createAddress = async (req, res) => {
  try {
    const { userId, adresse, rue, numero, ville, codePostal } = req.body;
    if (!userId || !adresse || !rue || !numero || !ville || !codePostal) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const address = await Adresse.create({
      userId,
      adresse,
      rue,
      numero,
      ville,
      codePostal,
    });

    if (!address) {
      return res.status(400).json({ error: "Address not created" });
    }

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une adresse
export const updateAddress = async (req, res) => {
  try {
    const { adresse, rue, numero, ville, codePostal } = req.body;

    if (!adresse && !rue && !numero && !ville && !codePostal) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }
    
    const address = await Adresse.findByPk(id);
    if (address) {
      address.adresse = adresse || address.adresse;
      address.rue = rue || address.rue;
      address.numero = numero || address.numero;
      address.ville = ville || address.ville;
      address.codePostal = codePostal || address.codePostal;
      await address.save();

      res.status(200).json(address);
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une adresse
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing ID" });
    }
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }

    const address = await Adresse.findByPk(id);
    if (address) {
      await address.destroy();
      res.status(204).json({ message: "Address deleted" });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
