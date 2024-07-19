import Router from "express";
import { createSession, updatePrice } from "../controllers/stripeController.js";
import { createProduct } from "../controllers/stripeController.js";

const router = Router();

router.post("/create-checkout-session", createSession);
router.post("/create-product", createProduct);
router.post("/update-price", updatePrice);

export default router;
