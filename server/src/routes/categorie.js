import Router from 'express';
import { getCategory, getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categorieController.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
