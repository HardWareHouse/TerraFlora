import { Router } from "express";
import { 
    getAddress, 
    getAllAddresses, 
    createAddress, 
    updateAddress, 
    deleteAddress 
} from "../controllers/adresseController.js";
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getAllAddresses);
router.get('/:id', authenticate, getAddress);
router.post('/', authenticate, createAddress);
router.put('/:id', authenticate, updateAddress);
router.delete('/:id', authenticate, deleteAddress);

export default router;