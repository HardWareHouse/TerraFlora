import Router from 'express';
import {
    getUser, 
    getAllUsers, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, authorizeAdmin, getAllUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, authorizeAdmin, deleteUser);

export default router;
