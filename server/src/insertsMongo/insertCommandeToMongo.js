import "../modelsSQL/associations.js";
import { connectMongo } from "../mongo.js";
import mongoose from "mongoose";
import CommandeMongo from "../modelsMongo/Commande.mongo.js";
import CommandeSQL from "../modelsSQL/Commande.js";
import User from "../modelsSQL/User.js";

async function insertCommandeToMongo() {
    await connectMongo();

    let commandes = await CommandeSQL.findAll(
        {
            include: {
                model: User,
                attributes: ['nom', 'prenom', 'email']
            }
        }
    );

    await CommandeMongo.create(
        commandes.map((commande) => ({
            _id: commande.numero,
            numero: commande.numero,
            statut: commande.statut,
            dateCommande: commande.dateCommande,
            total: commande.total,
            dateLivraisonPrevue: commande.dateLivraisonPrevue,
            dateLivraisonFinale: commande.dateLivraisonFinale,
            user: {
                nom: commande.User.nom,
                prenom: commande.User.prenom,
                email: commande.User.email
            }
        })),
    );
}

insertCommandeToMongo()
    .then(() => {
        console.log("Commandes inserted successfully");
        mongoose.connection.close();
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    });