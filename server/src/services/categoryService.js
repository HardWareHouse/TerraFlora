import Categorie from "../modelsSQL/Categorie.js";

export const findCategoryById = async (id) => {
  return await Categorie.findByPk(id);
};

export const findAllCategories = async () => {
  return await Categorie.findAll();
};

export const createCategory = async (categoryData) => {
  return await Categorie.create(categoryData);
};

export const updateCategory = async (id, updateData) => {
  const category = await Categorie.findByPk(id);
  if (category) {
    category.nom = updateData.nom || category.nom;
    category.description = updateData.description || category.description;
    await category.save();
    return category;
  }
  return null;
};

export const deleteCategory = async (id) => {
  const category = await Categorie.findByPk(id);
  if (category) {
    await category.destroy();
    return true;
  }
  return false;
};
