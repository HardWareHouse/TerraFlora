import Router from "express";
import { stripeWebhook } from "../controllers/webhookController.js";
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post("/", authenticate, stripeWebhook);

export default router;
