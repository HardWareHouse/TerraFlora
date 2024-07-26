import Router from 'express';
import { getProduct, 
        getAllProducts, 
        createProduct, 
        updateProduct, 
        deleteProduct, 
        getFilteredProducts, 
        getProductByName, 
        getStockHistory, 
        subtractStock 
    } from '../controllers/searchController.js';
import upload from '../middlewares/uploadMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/filter', getFilteredProducts);
router.get('/:id', getProduct);
router.post('/', authenticate, upload.array('images', 3), createProduct);
router.put('/:id', authenticate, upload.array('images', 3), updateProduct);
router.delete('/:id', authenticate, deleteProduct);
router.get('/name/:name', getProductByName);
router.get("/:produitId/history", authenticate, getStockHistory);
router.post('/subtract-stock', authenticate, subtractStock);

export default router;
