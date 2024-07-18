import "../modelsSQL/associations.js";
import CategorieMongo from "../modelsMongo/Categorie.mongo.js";
import CategorieSQL from "../modelsSQL/Categorie.js";
import Produit from '../modelsSQL/Produit.js';

async function insertCategoriesToMongo() {

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

export default insertCategoriesToMongo;