import "../modelsSQL/associations.js";
import ProduitMongo from "../modelsMongo/Produit.mongo.js";
import ProduitSQL from "../modelsSQL/Produit.js";
import Categorie from "../modelsSQL/Categorie.js";

async function insertOrUpdateProductInMongo(productSQL) {
    const productMongo = await ProduitMongo.findById(productSQL.id).exec();

    const newProduct = {
        _id: productSQL.id,
        nom: productSQL.nom,
        description: productSQL.description,
        prix: productSQL.prix,
        stock: productSQL.stock,
        marque: productSQL.marque,
        couleur: productSQL.couleur,
        taille: productSQL.taille,
        isPromotion: productSQL.isPromotion,
        pourcentagePromotion: productSQL.pourcentagePromotion,
        categorie: {
            _id: productSQL.Categorie.id,
            nom: productSQL.Categorie.nom,
        },
        priceId: productSQL.priceId,
    };

    if (productMongo) {
        const isSame = Object.keys(newProduct).every(key => 
            JSON.stringify(newProduct[key]) === JSON.stringify(productMongo[key])
        );

        if (!isSame) {
            await ProduitMongo.findByIdAndUpdate(productSQL.id, newProduct).exec();
        }
    } else {
        await ProduitMongo.create(newProduct);
    }
}

async function insertProductToMongo() {
    let products = await ProduitSQL.findAll({
        include: Categorie,
    });

    for (const product of products) {
        await insertOrUpdateProductInMongo(product);
    }
}

export default insertProductToMongo;
