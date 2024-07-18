import "../modelsSQL/associations.js";
import AdresseMongo from "../modelsMongo/Adresse.mongo.js";
import AdresseSQL from "../modelsSQL/Adresse.js";
import User from "../modelsSQL/User.js";

async function insertAdresseToMongo() {

    let adresses = await AdresseSQL.findAll(
        {
            include: User,
            attributes: ['nom', 'prenom', 'email']
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

export default insertAdresseToMongo;