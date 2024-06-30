import express from 'express';
import {
  updateWantsMailNewProduct,
  updateWantsMailRestockProduct,
  updateWantsMailChangingPrice,
  updateWantsMailNewsletter
} from '../controllers/emailPreferenceController.js';
import { verifyToken } from '../middlewares/emailPreferenceMiddleware.js';

const router = express.Router();

router.put('/updateWantsMailNewProduct', verifyToken, updateWantsMailNewProduct);
router.put('/updateWantsMailRestockProduct', verifyToken, updateWantsMailRestockProduct);
router.put('/updateWantsMailChangingPrice', verifyToken, updateWantsMailChangingPrice);
router.put('/updateWantsMailNewsletter', verifyToken, updateWantsMailNewsletter);

export default router;
