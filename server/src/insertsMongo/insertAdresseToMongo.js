import "../modelsSQL/associations.js";
import AdresseMongo from "../modelsMongo/Adresse.mongo.js";
import AdresseSQL from "../modelsSQL/Adresse.js";
import User from "../modelsSQL/User.js";

async function insertOrUpdateAdresseInMongo(adresseSQL) {
    const adresseMongo = await AdresseMongo.findById(adresseSQL.id).exec();

    const newAdresse = {
        _id: adresseSQL.id,
        voie: adresseSQL.voie,
        numero: adresseSQL.numero,
        rue: adresseSQL.rue,
        ville: adresseSQL.ville,
        codePostal: adresseSQL.codePostal,
        isDeliveryAddress: adresseSQL.isDeliveryAddress,
        isBillingAddress: adresseSQL.isBillingAddress,
        user: {
            nom: adresseSQL.User.nom,
            prenom: adresseSQL.User.prenom,
            email: adresseSQL.User.email,
        },
    };

    if (adresseMongo) {
        const isSame = Object.keys(newAdresse).every(key => 
            JSON.stringify(newAdresse[key]) === JSON.stringify(adresseMongo[key])
        );

        if (!isSame) {
            await AdresseMongo.findByIdAndUpdate(adresseSQL.id, newAdresse).exec();
        }
    } else {
        await AdresseMongo.create(newAdresse);
    }
}

async function insertAdresseToMongo() {
    let adresses = await AdresseSQL.findAll({
        include: {
            model: User,
            attributes: ['nom', 'prenom', 'email']
        },
    });

    for (const adresse of adresses) {
        await insertOrUpdateAdresseInMongo(adresse);
    }
}

export default insertAdresseToMongo;
