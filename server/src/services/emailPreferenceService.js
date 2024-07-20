import UserSQL from "../modelsSQL/User.js";
import UserMongo from "../modelsMongo/User.mongo.js";

export const updateUserMongoWantsMailNewProduct = async (userId, wantsMailNewProduct) => {
    try {
        await UserMongo.updateOne({ _id: userId }, { $set: { wantsMailNewProduct } });
    } catch (error) {
        throw new Error(`Error updating wantsMailNewProduct: ${error.message}`);
    }
};

export const updateUserMongoWantsMailRestockProduct = async (userId, wantsMailRestockProduct) => {
    try {
        await UserMongo.updateOne({ _id: userId }, { $set: { wantsMailRestockProduct } });
    } catch (error) {
        throw new Error(`Error updating wantsMailRestockProduct: ${error.message}`);
    }
};

export const updateUserMongoWantsMailChangingPrice = async (userId, wantsMailChangingPrice) => {
    try {
        await UserMongo.updateOne({ _id: userId }, { $set: { wantsMailChangingPrice } });
    } catch (error) {
        throw new Error(`Error updating wantsMailChangingPrice: ${error.message}`);
    }
};

export const updateUserMongoWantsMailNewsletter = async (userId, wantsMailNewsletter) => {
    try {
        await UserMongo.updateOne({ _id: userId }, { $set: { wantsMailNewsletter } });
    } catch (error) {
        throw new Error(`Error updating wantsMailNewsletter: ${error.message}`);
    }
};
