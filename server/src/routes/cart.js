import Router from 'express';
import {
  getCart,
  createCart,
  updateCart,
  deleteCart,
  deleteProductFromCart
} from '../controllers/cartController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/:id',authenticate, getCart);
router.post('/', authenticate,createCart);
router.put('/:id',authenticate, updateCart);
router.delete('/:id',authenticate, deleteCart);
router.delete('/:userId/product/:productId',authenticate, deleteProductFromCart);

export default router;
