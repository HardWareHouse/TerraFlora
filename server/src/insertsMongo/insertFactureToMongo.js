import "../modelsSQL/associations.js";
import { connectMongo } from "../mongo.js";
import mongoose from "mongoose";
import FactureMongo from "../modelsMongo/Facture.mongo.js";
import FactureSQL from "../modelsSQL/Facture.js";
import User from "../modelsSQL/User.js";
import Commande from "../modelsSQL/Commande.js";

async function insertFactureToMongo() {
    await connectMongo();

    let factures = await FactureSQL.findAll(
        {
            include: [
                {
                    model: User,
                    attributes: ['nom', 'prenom', 'email']
                },
                {
                    model: Commande,
                    attributes: ['numero']
                }
            ]
        }
    );

    await FactureMongo.create(
        factures.map((facture) => ({
            _id: facture.numero,
            numero: facture.numero,
            dateFacture: facture.dateFacturation,
            datePaiementDue: facture.datePaiementDue,
            total: facture.total,
            user: {
                nom: facture.User.nom,
                prenom: facture.User.prenom,
                email: facture.User.email
            },
            commande: {
                numero: facture.Commande.numero
            }
        })),
    );
}

insertFactureToMongo()
    .then(() => {
        console.log("Factures inserted successfully");
        mongoose.connection.close();
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    });