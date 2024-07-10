import express from "express";
import { connectToDatabase, connection } from "./modelsSQL/dataBase.js";
import "./mongo.js";
import "../src/modelsSQL/associations.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import invoiceRouter from "./routes/invoice.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import produitRouter from "./routes/produit.js";
import emailPreferenceRoutes from "./routes/emailPreference.js";
import categorieRoutes from "./routes/categorie.js";
import adresseRoutes from "./routes/adresse.js";
import path from "path";
import Stripe from "stripe";

dotenv.config();
const stripe = Stripe(process.env.VITE_STRIPE_SECRET_KEY);

const server = express();

server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// Existing routes
server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/admin", adminRouter);
server.use("/orders", orderRouter);
server.use("/invoices", invoiceRouter);
server.use("/address", adresseRoutes);
server.use("/product", produitRouter);
server.use("/categories", categorieRoutes);
server.use("/emailPreferences", emailPreferenceRoutes);
server.use("/uploads", express.static(path.join("src/uploads")));

// Stripe Checkout route
const YOUR_DOMAIN = "http://localhost:5174";

server.listen(8000, "0.0.0.0", () => {
  console.log("Server listening on port 8000");
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.post("/create-checkout-session", async (req, res) => {
  try {
    const { lineItems } = req.body;

    console.log(lineItems);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      shipping_options: [
        {
          shipping_rate: "shr_1PaL80RvflFVG7kRWebshOPO",
        },
      ],
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message: `I agree to the [Terms of Service](${YOUR_DOMAIN}/cgu)`,
        },
      },
      invoice_creation: {
        enabled: true,
      },
      phone_number_collection: {
        enabled: true,
      },
      custom_fields: [
        {
          key: "note",
          label: {
            type: "custom",
            custom: "Notes de commande",
          },
          type: "text",
          optional: true,
        },
      ],
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      automatic_tax: { enabled: true },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

connectToDatabase()
  .then(() => {
    connection
      .sync()
      .then(() => {
        console.log("Database & tables created!");
      })
      .catch((error) => {
        console.error("Unable to sync database:", error);
      });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
