import Router from 'express';
import { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct } from '../controllers/searchController.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
