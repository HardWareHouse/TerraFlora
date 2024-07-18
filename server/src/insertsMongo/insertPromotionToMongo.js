import "../modelsSQL/associations.js";
import PromotionMongo from "../modelsMongo/Promotion.mongo.js";
import PromotionSQL from "../modelsSQL/Promotion.js";

async function insertPromotionToMongo() {

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