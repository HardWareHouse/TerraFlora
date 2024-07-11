import Router from "express";
import { createSession } from "../controllers/stripeController.js";
import { createProduct } from "../controllers/stripeController.js";

const router = Router();

router.post("/create-checkout-session", createSession);
router.post("/create-product", createProduct);
export default router;
