import Router from 'express';
import {getUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
