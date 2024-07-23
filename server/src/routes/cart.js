import Router from 'express';
import {
  getCart,
  createCart,
  updateCart,
  deleteCart,
  deleteProductFromCart,
  reserveCart
} from '../controllers/cartController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/:id',authenticate, getCart);
router.post('/', authenticate,createCart);
router.put('/:id',authenticate, updateCart);
router.delete('/:id',authenticate, deleteCart);
router.delete('/:userId/product/:productId',authenticate, deleteProductFromCart);
router.post('/reserve', authenticate, reserveCart);

export default router;
