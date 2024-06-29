import { Router } from "express";
import { 
    getAddress, 
    getAllAddresses, 
    getAddressByUserId, 
    createAddress, 
    updateAddress, 
    deleteAddress 
} from "../controllers/adresseController.js";
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getAllAddresses);
router.get('/:id', authenticate, getAddressByUserId);
router.post('/', authenticate, createAddress);
router.put('/:id', authenticate, updateAddress);
router.delete('/:id', authenticate, deleteAddress);

export default router;