import { Router } from 'express';
import {  updateWantsMailNewProduct, updateWantsMailRestockProduct, updateWantsMailChangingPrice, updateWantsMailNewsletter } from '../controllers/emailPreferenceController.js';

const router = Router();

router.put('/updateWantsMailNewProduct', updateWantsMailNewProduct);
router.put('/updateWantsMailRestockProduct', updateWantsMailRestockProduct);
router.put('/updateWantsMailChangingPrice', updateWantsMailChangingPrice);
router.put('/updateWantsMailNewsletter', updateWantsMailNewsletter);

export default router;
