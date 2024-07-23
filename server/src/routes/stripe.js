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

const router = Router();

router.post("/create-checkout-session", createSession);
router.post("/create-product", createProduct);
router.post("/update-price", updatePrice);
router.get("/transactions", getBalanceTransactions);
router.post("/refund", issueRefund);
router.post("/payment-link", createPaymentLink);
router.get("/session/:sessionId", getSession);
router.get("/session/:sessionId/items", getSessionLineItems);
router.get("/invoice/:invoiceId", getInvoice);

export default router;
