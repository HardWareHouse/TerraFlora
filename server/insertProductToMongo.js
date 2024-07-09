import "./src/modelsSQL/associations.js";
import mongoose from "mongoose";
import ProduitMongo from "./src/modelsMongo/Produit.mongo.js";
import ProduitSQL from "./src/modelsSQL/Produit.js";
import Categorie from "./src/modelsSQL/Categorie.js";
import { ObjectId } from "mongodb";

async function insertProductToMongo() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    dbName: "terraflora",
    auth: {
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
    },
  });

  let products = await ProduitSQL.findAll({
    include: Categorie,
  });

  await ProduitMongo.create(
    products.map((product) => ({
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      stock: product.stock,
      marque: product.marque,
      couleur: product.couleur,
      taille: product.taille,
      isPromotion: product.isPromotion,
      pourcentagePromotion: product.pourcentagePromotion,
      categorie: {
        _id: product.Categorie.id,
        nom: product.Categorie.nom,
      },
      priceId: product.priceId,
    }))
  );
}

insertProductToMongo()
  .then(() => {
    console.log("Products inserted successfully");
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
  });
