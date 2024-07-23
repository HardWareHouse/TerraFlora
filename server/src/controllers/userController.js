import * as userService from "../services/userService.js";
import { isValidUUID } from "../helpers/validatorHelper.js";
import { isEmailAddressValid } from "../helpers/emailAddressHelper.js";
import {
  isPasswordValid,
  comparePasswords,
} from "../helpers/passwordHelper.js";

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
  const user = req.user;

  if (!isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  if (user.id !== id && user.role !== "ROLE_ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const existingUser = await userService.getUser(id);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      nom,
      prenom,
      email,
      telephone,
      role,
      password,
      newPassword,
      confirmPassword,
    } = req.body;

    if (user.role === "ROLE_ADMIN") {
      if (!nom || !prenom || !email || !telephone || !role) {
        return res.status(400).json({ error: "Missing fields to update" });
      }

      if (role === "ROLE_ADMIN") {
        return res.status(403).json({ error: "Unauthorized role update" });
      }

      if (!["ROLE_USER", "ROLE_STORE_KEEPER"].includes(role)) {
        return res.status(403).json({ error: "Invalid role" });
      }

      if (email && !isEmailAddressValid(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const existingUserWithEmail = await userService.getUserByEmail(email);
      if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        return res.status(409).json({ error: "Email already in use" });
      }

      const updatedUserData = {
        nom: nom || existingUser.nom,
        prenom: prenom || existingUser.prenom,
        email: email || existingUser.email,
        telephone: telephone || existingUser.telephone,
        role: role || existingUser.role,
      };

      const updatedUser = await userService.adminUpdateUserById(id, updatedUserData);
      if (!updatedUser) {
        return res.status(400).json({ error: "No data to update" });
      }

      res.status(200).json(updatedUser);
    } else {
      if (!nom || !prenom || !email || !password || !telephone) {
        return res.status(400).json({ error: "Missing fields to update" });
      }

      if (req.body.role || req.body.id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      if (email && !isEmailAddressValid(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const existingUserWithEmail = await userService.getUserByEmail(email);
      if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        return res.status(409).json({ error: "Email already in use" });
      }

      if (password && !isPasswordValid(password)) {
        return res.status(400).json({ error: "Password is not strong enough" });
      }

      const passwordMatch = await comparePasswords(password, existingUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const updatedUserData = {
        nom: nom || existingUser.nom,
        prenom: prenom || existingUser.prenom,
        email: email || existingUser.email,
        telephone: telephone || existingUser.telephone,
      };

      if (newPassword) {
        if (!confirmPassword) {
          return res.status(400).json({ error: "Missing confirm password" });
        }

        if (newPassword !== confirmPassword) {
          return res.status(400).json({ error: "Passwords do not match" });
        }

        if (!isPasswordValid(newPassword)) {
          return res.status(400).json({ error: "The new password is not strong enough" });
        }

        updatedUserData.password = newPassword;
      }

      const updatedUser = await userService.updateUserById(id, updatedUserData);
      if (!updatedUser) {
        return res.status(400).json({ error: "No data to update" });
      }

      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!id || !isValidUUID(id)) {
    return res.status(400).json({ error: "Invalid or missing user dsdsID" });
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
