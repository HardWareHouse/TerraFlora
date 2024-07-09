import Router from 'express';
import { getCategory, getAllCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categorieController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', authenticate, authorizeAdmin, createCategory);
router.put('/:id', authenticate, authorizeAdmin, updateCategory);
router.delete('/:id', authenticate, authorizeAdmin, deleteCategory);

export default router;
