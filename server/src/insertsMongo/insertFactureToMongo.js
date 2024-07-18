import "../modelsSQL/associations.js";
import FactureMongo from "../modelsMongo/Facture.mongo.js";
import FactureSQL from "../modelsSQL/Facture.js";
import User from "../modelsSQL/User.js";
import Commande from "../modelsSQL/Commande.js";

async function insertFactureToMongo() {

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

export default insertFactureToMongo;