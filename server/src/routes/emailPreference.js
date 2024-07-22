import express from 'express';
import {
  updateMailPreference
} from '../controllers/emailPreferenceController.js';
import { verifyToken } from '../middlewares/emailPreferenceMiddleware.js';

const router = express.Router();

router.put('/:userId', verifyToken, updateMailPreference);

export default router;
