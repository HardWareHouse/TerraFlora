import Router from 'express';
import { 
    getOrder, 
    getAllOrders,
    createOrder, 
    updateOrder, 
    deleteOrder 
} from '../controllers/orderController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getAllOrders);
router.get('/:id', authenticate, getOrder);
router.post('/', authenticate, createOrder);
router.put('/:id', authenticate, updateOrder);
router.delete('/:id', authenticate, authorizeAdmin, deleteOrder);

export default router;