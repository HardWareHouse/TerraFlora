import "../modelsSQL/associations.js";
import { connectMongo } from "../mongo.js";
import mongoose from "mongoose";
import PromotionMongo from "../modelsMongo/Promotion.mongo.js";
import PromotionSQL from "../modelsSQL/Promotion.js";

async function insertPromotionToMongo() {
    await connectMongo();

    let promotions = await PromotionSQL.findAll();

    await PromotionMongo.create(
        promotions.map((promotion) => ({
            _id: promotion.id,
            remise: promotion.remise,
            dateDebut: promotion.dateDebut,
            dateFin: promotion.dateFin
        })),
    );
}


insertPromotionToMongo()
    .then(() => {
        console.log("Promotions inserted successfully");
        mongoose.connection.close();
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    });