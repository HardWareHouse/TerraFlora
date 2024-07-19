import Stripe from "stripe";
import { fulfillCheckout } from "./stripeController.js";
const stripe = Stripe(process.env.VITE_STRIPE_SECRET_KEY);

const endpointSecret = process.env.VITE_ENDPOINT_SECRET;

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const body = req.body.toString("utf8");
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    fulfillCheckout(event.data.object.id);
  }

  res.send("Webhook received");
};
