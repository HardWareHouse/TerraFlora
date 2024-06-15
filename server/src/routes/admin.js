import Router from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, authorizeAdmin);

export default router;
