import {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  } from '../../services/categoryService.js';
  import CategorieSQL from "../../modelsSQL/Categorie.js";
  import CategorieMongo from "../../modelsMongo/Categorie.mongo.js";
  
  jest.mock("../../modelsSQL/Categorie.js");
  jest.mock("../../modelsMongo/Categorie.mongo.js");
  
  describe('Category Service', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('findAllCategories', () => {
      it('should return all categories', async () => {
        const mockCategories = [
          { id: '1', nom: 'Category 1', description: 'Description 1' },
          { id: '2', nom: 'Category 2', description: 'Description 2' }
        ];
        CategorieMongo.find.mockReturnValue({
          select: jest.fn().mockResolvedValue(mockCategories)
        });
  
        const result = await findAllCategories();
  
        expect(result).toEqual(mockCategories);
        expect(CategorieMongo.find).toHaveBeenCalled();
      });
    });
  
    describe('findCategoryById', () => {
      it('should return a category by id', async () => {
        const mockCategory = { id: '1', nom: 'Category 1', description: 'Description 1' };
        CategorieMongo.aggregate.mockResolvedValue([mockCategory]);
  
        const result = await findCategoryById('1');
  
        expect(result).toEqual(mockCategory);
        expect(CategorieMongo.aggregate).toHaveBeenCalledWith(expect.arrayContaining([
          { $match: { _id: '1' } },
          expect.any(Object)
        ]));
      });
  
      it('should return null if category not found', async () => {
        CategorieMongo.aggregate.mockResolvedValue([]);
  
        const result = await findCategoryById('1');
  
        expect(result).toBeNull();
      });
    });
  
    describe('createCategory', () => {
      it('should create a new category', async () => {
        const categoryData = { nom: 'New Category', description: 'New Description' };
        const newCategorySQL = { id: '1', ...categoryData };
        CategorieSQL.create.mockResolvedValue(newCategorySQL);
        CategorieMongo.create.mockResolvedValue(newCategorySQL);
  
        const result = await createCategory(categoryData);
  
        expect(result).toEqual(newCategorySQL);
        expect(CategorieSQL.create).toHaveBeenCalledWith(categoryData);
        expect(CategorieMongo.create).toHaveBeenCalledWith({
          _id: '1',
          ...categoryData,
          produits: []
        });
      });
    });
  
    describe('updateCategory', () => {
      it('should update an existing category', async () => {
        const updateData = { nom: 'Updated Category' };
        CategorieSQL.findByPk.mockResolvedValue({
          update: jest.fn().mockResolvedValue(true)
        });
        CategorieMongo.updateOne.mockResolvedValue({ modifiedCount: 1 });
  
        const result = await updateCategory('1', updateData);
  
        expect(result).toBe(true);
        expect(CategorieSQL.findByPk).toHaveBeenCalledWith('1');
        expect(CategorieMongo.updateOne).toHaveBeenCalledWith({ _id: '1' }, updateData);
      });
  
      it('should return message if no data to update', async () => {
        CategorieSQL.findByPk.mockResolvedValue({
          update: jest.fn().mockResolvedValue(true)
        });
  
        const result = await updateCategory('1', {});
  
        expect(result).toEqual({ message: "No data to update" });
      });
  
      it('should return false if category not found', async () => {
        CategorieSQL.findByPk.mockResolvedValue(null);
  
        const result = await updateCategory('1', { nom: 'Updated Category' });
  
        expect(result).toBe(false);
      });
    });
  
    describe('deleteCategory', () => {
      it('should delete an existing category', async () => {
        CategorieSQL.findByPk.mockResolvedValue({
          destroy: jest.fn().mockResolvedValue(true)
        });
        CategorieMongo.deleteOne.mockResolvedValue({ deletedCount: 1 });
  
        const result = await deleteCategory('1');
  
        expect(result).toBe(true);
        expect(CategorieSQL.findByPk).toHaveBeenCalledWith('1');
        expect(CategorieMongo.deleteOne).toHaveBeenCalledWith({ _id: '1' });
      });
  
      it('should return false if category not found', async () => {
        CategorieSQL.findByPk.mockResolvedValue(null);
  
        const result = await deleteCategory('1');
  
        expect(result).toBe(false);
      });
    });
  });