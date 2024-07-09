import * as userService from "../services/userService.js";
import { isValidUUID, isValidEmail, isStrongPassword } from "../helpers/validatorHelper.js";

// Lire les informations d'un utilisateur
export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  if (id !== user.id && user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const foundUser = await userService.getUserById(id);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (foundUser.id !== user.id && user.role !== "ROLE_ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les utilisateurs
export const getAllUsers = async (req, res) => {
  const user = req.user;

  if (user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const users = await userService.getAllUsers();
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, password, telephone, role } = req.body;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  if (email && !isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password && !isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is not strong enough" });
  }

  if (user.id !== id && user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if(role === "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const updatedUser = await userService.updateUserById(id, {
      nom,
      prenom,
      email,
      password,
      telephone,
      role,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing user ID" });
  }

  if (user.id !== id && user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const userToDelete = await userService.getUserById(id);
    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const deletedUser = await userService.deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
