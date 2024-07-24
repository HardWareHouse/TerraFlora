import Router from 'express';
import { 
    getContact, 
    getAllContacts, 
    createContact, 
    updateContact, 
    deleteContact 
} from '../controllers/contactController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { isDailyLimitContactExceeded, isMonthlyLimitContactExceeded } from '../middlewares/contactMiddleware.js';

const router = Router();

router.get('/', authenticate, authorizeAdmin, getAllContacts);
router.get('/:id', authenticate, getContact);
router.post('/', authenticate, isDailyLimitContactExceeded, isMonthlyLimitContactExceeded, createContact);
router.put('/:id', authenticate, authorizeAdmin, updateContact);
router.delete('/:id', authenticate, authorizeAdmin, deleteContact);

export default router;