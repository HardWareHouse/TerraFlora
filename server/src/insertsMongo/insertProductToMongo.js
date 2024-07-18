import "../modelsSQL/associations.js";
import { connectMongo } from "../modelsMongo/mongo.js";
import mongoose from "mongoose";
import ProduitMongo from "../modelsMongo/Produit.mongo.js";
import ProduitSQL from "../modelsSQL/Produit.js";
import Categorie from "../modelsSQL/Categorie.js";

async function insertProductToMongo() {
  await connectMongo();

  let products = await ProduitSQL.findAll(
    {
      include: Categorie,
    }
  );

  await ProduitMongo.create(
    products.map((product) => ({
      _id: product.id,
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

export default insertProductToMongo;
