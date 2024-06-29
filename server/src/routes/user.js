import Router from 'express';
import {
    getUser, 
    getAllUsers, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
