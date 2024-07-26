import Router from "express";
import {
  createSession,
  updatePrice,
  getBalanceTransactions,
  issueRefund,
  createPaymentLink,
  getSession,
  getSessionLineItems,
  getInvoice,
} from "../controllers/stripeController.js";
import { createProduct } from "../controllers/stripeController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create-checkout-session", authenticate, createSession);
router.post("/create-product", authenticate, createProduct);
router.post("/update-price", authenticate, updatePrice);
router.get("/transactions", authenticate, getBalanceTransactions);
router.post("/refund", authenticate, issueRefund);
router.post("/payment-link", authenticate, authorizeAdmin, createPaymentLink);
router.get("/session/:sessionId", authenticate, getSession);
router.get("/session/:sessionId/items", authenticate, getSessionLineItems);
router.get("/invoice/:invoiceId", authenticate, getInvoice);

export default router;
