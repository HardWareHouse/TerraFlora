import { isValidUUID } from "../helpers/validatorHelper.js";
import * as addressService from "../services/addressService.js";

// Lire toutes les adresses
export const getAllAddresses = async (req, res) => {
  const user = req.user;

  try {
    if (user.role === "ROLE_ADMIN") {
      const addresses = await addressService.getAllAddresses();
      if (!addresses) {
        return res.status(404).json({ error: "Addresses not found" });
      }
      return res.status(200).json(addresses);
    } else {
      const addresses = await addressService.getAddressByUserId(user.id);
      if (!addresses) {
        return res.status(404).json({ error: "Addresses not found" });
      }
      return res.status(200).json(addresses);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire les informations d'une adresse
export const getAddress = async (req, res) => {
  const { id } = req.params;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing address ID" });
  }

  try {
    const address = await addressService.getAddressById(id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    const user = req.user;
    if (address.user._id !== user.id && user.role !== "ROLE_ADMIN") return res.status(403).json({ error: "Unauthorized" });

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une adresse
export const createAddress = async (req, res) => {
  const { userId, voie, rue, numero, ville, codePostal, isBillingAddress, isDeliveryAddress } = req.body;
  const user = req.user;

  if (!userId || !voie || !rue || !numero || !ville || !codePostal) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!isValidUUID(userId)) {
    return res.status(400).json({ error: "Invalid UUID format" });
  }

  if (user.id !== userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const address = await addressService.createAddress({
      userId,
      voie,
      rue,
      numero,
      ville,
      codePostal,
      isBillingAddress,
      isDeliveryAddress,
    });

    if (!address) return res.status(404).json({ error: "Addres not created" });
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une adresse
export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { voie, rue, numero, ville, codePostal, isDeliveryAddress, isBillingAddress } = req.body;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing address ID" });
  }

  if (!voie && !rue && !numero && !ville && !codePostal && !isDeliveryAddress && !isBillingAddress) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const address = await addressService.getAddressById(id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    if (address.user._id !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedAddress = await addressService.updateAddressById(id, { voie, rue, numero, ville, codePostal, isDeliveryAddress, isBillingAddress });
    if (!updatedAddress) return res.status(404).json({ error: "Address not updated" });

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une adresse
export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing address ID" });
  }

  try {
    const address = await addressService.getAddressById(id);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    if (address.user._id !== user.id && user.role !== 'ROLE_ADMIN') return res.status(403).json({ error: "Unauthorized" });
    
    const deleteAddress = await addressService.deleteAddressById(id);
    if (!deleteAddress) {
      return res.status(404).json({ error: "Address not deleted" });
    }
    
    res.status(204).json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
