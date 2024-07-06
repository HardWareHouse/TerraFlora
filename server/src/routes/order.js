import Router from 'express';
import { 
    getOrder, 
    getAllOrders,
    getOrdersByUserId, 
    createOrder, 
    updateOrder, 
    deleteOrder 
} from '../controllers/orderController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, authorizeAdmin, getAllOrders);
router.get('/:id', authenticate, getOrdersByUserId);
router.post('/', authenticate, createOrder);
router.put('/:id', authenticate, updateOrder);
router.delete('/:id', authenticate, authorizeAdmin, deleteOrder);

export default router;