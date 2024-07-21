import Router from 'express';
import {
  getCart,
  getAllCartsByUser,
  createCart,
  updateCart,
  deleteCart,
  deleteProductFromCart
} from '../controllers/cartController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/',authorizeAdmin, getAllCartsByUser);
router.get('/:id', getCart);
router.post('/',createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.delete('/:userId/product/:productId', deleteProductFromCart);

export default router;
