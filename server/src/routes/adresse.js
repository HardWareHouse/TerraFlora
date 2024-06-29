import { Router } from "express";
import { 
    getAddress, 
    getAllAddresses, 
    getAddressByUserId, 
    createAddress, 
    updateAddress, 
    deleteAddress 
} from "../controllers/adresseController.js";

const router = Router();

router.get('/', getAllAddresses);
router.get('/:id', getAddressByUserId);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

export default router;