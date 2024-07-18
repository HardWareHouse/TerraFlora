import "../modelsSQL/associations.js";
import { connectMongo } from "../modelsMongo/mongo.js";
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


export default insertPromotionToMongo;