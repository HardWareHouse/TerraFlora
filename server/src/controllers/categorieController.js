import Categorie from '../modelsSQL/Categorie.js';
import validator from 'validator';

// Lire les informations d'une catégorie
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }
    const category = await Categorie.findByPk(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une catégorie
export const createCategory = async (req, res) => {
  try {
    const category = await Categorie.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  try {
    const { nom, description } = req.body;
    const category = await Categorie.findByPk(req.params.id);
    if (category) {
      category.nom = nom || category.nom;
      category.description = description || category.description;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    const category = await Categorie.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
