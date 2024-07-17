import "../modelsSQL/associations.js";
import { connectMongo } from "../mongo.js";
import mongoose from "mongoose";
import AdresseMongo from "../modelsMongo/Adresse.mongo.js";
import AdresseSQL from "../modelsSQL/Adresse.js";
import User from "../modelsSQL/User.js";

async function insertAdresseToMongo() {
    await connectMongo();

    let adresses = await AdresseSQL.findAll(
        {
            include: User,
        }
    );

    await AdresseMongo.create(
        adresses.map((adresse) => ({
            _id: adresse.id,
            voie: adresse.voie,
            numero: adresse.numero,
            rue: adresse.rue,
            ville: adresse.ville,
            codePostal: adresse.codePostal,
            isDeliveryAddress: adresse.isDeliveryAddress,
            isBillingAddress: adresse.isBillingAddress,
            user: {
                nom: adresse.User.nom,
                prenom: adresse.User.prenom,
                email: adresse.User.email,
            },
        }))
    );
}

insertAdresseToMongo()
    .then(() => {
        console.log("Adresses inserted successfully");
        mongoose.connection.close();
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    });