import "../modelsSQL/associations.js";
import { connectMongo } from "../mongo.js";
import mongoose from "mongoose";
import CategorieMongo from "../modelsMongo/Categorie.mongo.js";
import CategorieSQL from "../modelsSQL/Categorie.js";
import Produit from '../modelsSQL/Produit.js';

async function insertCategoriesToMongo() {
    await connectMongo();

    let categories = await CategorieSQL.findAll(
        {
            include: {
                model: Produit,
                attributes: ['id', 'nom', 'description', 'prix']
            }
        }
    );

    await CategorieMongo.create(
        categories.map((categorie) => ({
            _id: categorie.id,
            nom: categorie.nom,
            description: categorie.description,
            produits: categorie.Produits.map((produit) => ({
                _id: produit.id,
                nom: produit.nom,
                description: produit.description,
                prix: produit.prix
            }))
        })),
    );
}

insertCategoriesToMongo()
    .then(() => {
        console.log("Categories inserted successfully");
        mongoose.connection.close();
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    });