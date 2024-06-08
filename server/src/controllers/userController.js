import User from '../modelsBDD/User.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Lire les informations d'un utilisateur
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, telephone, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.nom = nom || user.nom;
      user.prenom = prenom || user.prenom;
      user.email = email || user.email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
      user.telephone = telephone || user.telephone;
      user.role = role || user.role;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

