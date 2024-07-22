import "../modelsSQL/associations.js";
import { Op } from 'sequelize';
import UserMongo from "../modelsMongo/User.mongo.js";
import UserSQL from "../modelsSQL/User.js";

async function insertOrUpdateUserInMongo(userSQL) {
    const userMongo = await UserMongo.findById(userSQL.id).exec();

    const newUser = {
        _id: userSQL.id,
        nom: userSQL.nom,
        prenom: userSQL.prenom,
        email: userSQL.email,
        telephone: userSQL.telephone,
        role: userSQL.role,
        isVerified: userSQL.isVerified,
        isBlocked: userSQL.isBlocked,
        wantsMailNewProduct: userSQL.wantsMailNewProduct,
        wantsMailRestockProduct: userSQL.wantsMailRestockProduct,
        wantsMailChangingPrice: userSQL.wantsMailChangingPrice,
        wantsMailNewsletter: userSQL.wantsMailNewsletter,
    };

    if (userMongo) {
        const isSame = Object.keys(newUser).every(key => 
            JSON.stringify(newUser[key]) === JSON.stringify(userMongo[key])
        );

        if (!isSame) {
            await UserMongo.findByIdAndUpdate(userSQL.id, newUser).exec();
        }
    } else {
        await UserMongo.create(newUser);
    }
}

async function insertUserToMongo() {
    let users = await UserSQL.findAll({
        where: {
            role: {
                [Op.ne]: "ROLE_ADMIN"
            }
        },
    });

    for (const user of users) {
        await insertOrUpdateUserInMongo(user);
    }
}

export default insertUserToMongo;
