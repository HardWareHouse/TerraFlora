import "../modelsSQL/associations.js";
import FactureMongo from "../modelsMongo/Facture.mongo.js";
import FactureSQL from "../modelsSQL/Facture.js";
import User from "../modelsSQL/User.js";
import Commande from "../modelsSQL/Commande.js";

async function insertOrUpdateFactureInMongo(factureSQL) {
    const factureMongo = await FactureMongo.findById(factureSQL.id).exec();

    const newFacture = {
        _id: factureSQL.id,
        numero: factureSQL.numero,
        statutPaiement: factureSQL.statutPaiement,
        dateFacturation: factureSQL.dateFacturation,
        datePaiementDue: factureSQL.datePaiementDue,
        total: factureSQL.total,
        user: {
            _id: factureSQL.userId,
            nom: factureSQL.User.nom,
            prenom: factureSQL.User.prenom,
            email: factureSQL.User.email,
        },
        commande: {
            numero: factureSQL.Commande.numero,
        },
    };

    if (factureMongo) {
        const isSame = Object.keys(newFacture).every(key => 
            JSON.stringify(newFacture[key]) === JSON.stringify(factureMongo[key])
        );

        if (!isSame) {
            await FactureMongo.findByIdAndUpdate(factureSQL.id, newFacture).exec();
        }
    } else {
        await FactureMongo.create(newFacture);
    }
}

async function insertFactureToMongo() {
    let factures = await FactureSQL.findAll({
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
    });

    for (const facture of factures) {
        await insertOrUpdateFactureInMongo(facture);
    }
}

export default insertFactureToMongo;
