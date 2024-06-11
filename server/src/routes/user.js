import Router from 'express';
import {getUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

// create a new user by an admin

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
