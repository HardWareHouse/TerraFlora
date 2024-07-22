import "../modelsSQL/associations.js";
import DeletedUserMongo from "../modelsMongo/DeletedUser.mongo.js";
import DeletedUserSQL from "../modelsSQL/DeletedUser.js";

async function insertOrUpdateDeletedUserInMongo(deletedUserSQL) {
    const deletedUserMongo = await DeletedUserMongo.findById(deletedUserSQL.id).exec();

    const newDeletedUser = {
        _id: deletedUserSQL.id,
        role: deletedUserSQL.role,
        isVerified: deletedUserSQL.isVerified,
        isBlocked: deletedUserSQL.isBlocked,
        userId: deletedUserSQL.userId
    };

    if (deletedUserMongo) {
        const isSame = Object.keys(newDeletedUser).every(key => 
            JSON.stringify(newDeletedUser[key]) === JSON.stringify(deletedUserMongo[key])
        );

        if (!isSame) {
            await DeletedUserMongo.findByIdAndUpdate(deletedUserSQL.id, newDeletedUser).exec();
        }
    } else {
        await DeletedUserMongo.create(newDeletedUser);
    }
}

async function insertDeletedUserToMongo() {
    let deletedUsers = await DeletedUserSQL.findAll();

    for (const deletedUser of deletedUsers) {
        await insertOrUpdateDeletedUserInMongo(deletedUser);
    }
}

export default insertDeletedUserToMongo;
