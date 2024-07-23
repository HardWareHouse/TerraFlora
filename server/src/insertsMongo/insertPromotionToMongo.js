import "../modelsSQL/associations.js";
import PromotionMongo from "../modelsMongo/Promotion.mongo.js";
import PromotionSQL from "../modelsSQL/Promotion.js";

async function insertOrUpdatePromotionInMongo(promotionSQL) {
    const promotionMongo = await PromotionMongo.findById(promotionSQL.id).exec();

    const newPromotion = {
        _id: promotionSQL.id,
        remise: promotionSQL.remise,
        dateDebut: promotionSQL.dateDebut,
        dateFin: promotionSQL.dateFin,
    };

    if (promotionMongo) {
        const isSame = Object.keys(newPromotion).every(key => 
            JSON.stringify(newPromotion[key]) === JSON.stringify(promotionMongo[key])
        );

        if (!isSame) {
            await PromotionMongo.findByIdAndUpdate(promotionSQL.id, newPromotion).exec();
        }
    } else {
        await PromotionMongo.create(newPromotion);
    }
}

async function insertPromotionToMongo() {
    let promotions = await PromotionSQL.findAll();

    for (const promotion of promotions) {
        await insertOrUpdatePromotionInMongo(promotion);
    }
}

export default insertPromotionToMongo;
