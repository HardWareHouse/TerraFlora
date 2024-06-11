import './src/modelsSQL/associations.js';
import mongoose from 'mongoose';
import ProduitMongo from './src/modelsMongo/Produit.mongo.js';
import ProduitSQL from './src/modelsSQL/Produit.js';
import Categorie from './src/modelsSQL/Categorie.js';
import { ObjectId } from 'mongodb';

async function insertProductToMongo() {
    await mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING,
        {
          dbName: 'terraflora',
          auth: {
            username: process.env.MONGODB_USER,
            password: process.env.MONGODB_PASSWORD,
          },
        },
      );

    let products = await ProduitSQL.findAll({
        include: Categorie
    });

    for (let product of products) {
        // Generate a new ObjectId for each category
        let categoryId = new ObjectId();
        
        await ProduitMongo.create({
            nom: product.nom,
            description: product.description,
            prix: product.prix,
            stock: product.stock,
            marque: product.marque,
            isPromotion: product.isPromotion,
            pourcentagePromotion: product.pourcentagePromotion,
            categorie: {
                _id: categoryId,
                nom: product.Categorie.nom
            }
        });
    }
}

insertProductToMongo().then(() => {
    console.log('Products inserted successfully');
    mongoose.connection.close();
    process.exit(0);
}).catch(err => {
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
});
