import Router from 'express';
import { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct, getFilteredProducts, getProductByName, getStockHistory, subtractStock } from '../controllers/searchController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/filter', getFilteredProducts);
router.get('/:id', getProduct);
router.post('/', upload.array('images', 3), createProduct);
router.put('/:id', upload.array('images', 3), updateProduct);
router.delete('/:id', deleteProduct);
router.get('/name/:name', getProductByName);
router.get("/:produitId/history", getStockHistory);
router.post('/subtract-stock', subtractStock);

export default router;
