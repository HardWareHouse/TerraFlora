import "../modelsSQL/associations.js";
import CategorieMongo from "../modelsMongo/Categorie.mongo.js";
import CategorieSQL from "../modelsSQL/Categorie.js";
import Produit from '../modelsSQL/Produit.js';

async function insertOrUpdateCategorieInMongo(categorieSQL) {
    const categorieMongo = await CategorieMongo.findById(categorieSQL.id).exec();

    const newCategorie = {
        _id: categorieSQL.id,
        nom: categorieSQL.nom,
        description: categorieSQL.description,
        produits: categorieSQL.Produits.map((produit) => ({
            _id: produit.id,
            nom: produit.nom,
            description: produit.description,
            prix: produit.prix
        })),
    };

    if (categorieMongo) {
        const isSame = Object.keys(newCategorie).every(key => 
            JSON.stringify(newCategorie[key]) === JSON.stringify(categorieMongo[key])
        );

        if (!isSame) {
            await CategorieMongo.findByIdAndUpdate(categorieSQL.id, newCategorie).exec();
        }
    } else {
        await CategorieMongo.create(newCategorie);
    }
}

async function insertCategoriesToMongo() {
    let categories = await CategorieSQL.findAll({
        include: {
            model: Produit,
            attributes: ['id', 'nom', 'description', 'prix']
        }
    });

    for (const categorie of categories) {
        await insertOrUpdateCategorieInMongo(categorie);
    }
}

export default insertCategoriesToMongo;
