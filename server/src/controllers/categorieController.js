import * as categoryService from "../services/categoryService.js";
import { isValidUUID } from "../helpers/validatorHelper.js";

// Lire les informations d'une catégorie
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }
    const category = await categoryService.findCategoryById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.findAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une catégorie
export const createCategory = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorizedaccess' });
  }

  try {
    const { nom, description } = req.body;
    if (!nom || !description) {
      return res.status(400).json({ error: 'Nom et description sont requis' });
    }

    const newCategory = await categoryService.createCategory({ nom, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorizedaccess' });
  }

  try {
    const { nom, description } = req.body;
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }

    const updatedCategory = await categoryService.updateCategory(id, { nom, description });

    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Unauthorizedaccess' });
  }
  
  try {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid UUID format' });
    }

    const deleted = await categoryService.deleteCategory(id);

    if (deleted) {
      res.status(200).json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
