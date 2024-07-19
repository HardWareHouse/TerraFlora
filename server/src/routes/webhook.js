import Router from "express";
import { stripeWebhook } from "../controllers/webhookController.js";

const router = Router();

router.post("/", stripeWebhook);

export default router;
