import express from "express";
import { connectToDatabase, connection } from "./modelsSQL/dataBase.js";
import "./modelsSQL/associations.js";
import { initializeModels } from "./modelsMongo/indexMongo.js";
import { denormalizeData } from "./bin/denormalizeIntoMongo.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import orderRouter from "./routes/order.js";
import cartRouter from "./routes/cart.js";
import invoiceRouter from "./routes/invoice.js";
import authRouter from "./routes/auth.js";
import produitRouter from "./routes/produit.js";
import emailPreferenceRoutes from "./routes/emailPreference.js";
import categorieRoutes from "./routes/categorie.js";
import adresseRoutes from "./routes/adresse.js";
import stripeRouter from "./routes/stripe.js";
import webhookRouter from "./routes/webhook.js";
import helmet from "helmet";
import path from "path";
import "./cron/stockAlertCron.js";
import "./cron/reservationCron.js";

dotenv.config();

const server = express();

server.use(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookRouter
);

const corsOptions = {
  origin: process.env.FRONT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptions));
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives()
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    xssFilter: true
  })
);
console.log(process.env.FRONT_URL);


// routes
server.use("/users", userRouter);
server.use("/auth", authRouter);
server.use("/orders", orderRouter);
server.use("/cart", cartRouter);
server.use("/contacts", contactRouter);
server.use("/invoices", invoiceRouter);
server.use("/address", adresseRoutes);
server.use("/product", produitRouter);
server.use("/categories", categorieRoutes);
server.use("/emailPreferences", emailPreferenceRoutes);
server.use("/stripe", stripeRouter);
server.use("/hello", (req, res, next) => {
  res.sendStatus(200);
});

server.use("/uploads", express.static(path.join("src/uploads"), {
  setHeaders: (res, path) => {
    res.set("Cross-Origin-Resource-Policy", "cross-origin");
  }
}));

server.use((err, req, res, next) => {
  console.error("Error encountered:", err.stack);
  res.status(500).send("Something broke!");
});

// Connection à la base de données SQL et MongoDB
connectToDatabase()
  .then(() => {
    console.log("Connected to SQL database successfully.");

    return connection.sync();
  })
  .then(() => {
    console.log("SQL database & tables created!");

    return initializeModels();
  })
  .then(() => {
    console.log("MongoDB models initialized.");

    return denormalizeData();
  })
  .then(() => {
    console.log("MongoDB migrations completed.");

    // Lancement du serveur Express
    server.listen(8000, "0.0.0.0", () => {
      console.log("Server listening on port 8000");
    });
  })
  .catch((error) => {
    console.error("An error occurred during setup:", error);
  });
