import "../modelsSQL/associations.js";
import CommandeMongo from "../modelsMongo/Commande.mongo.js";
import CommandeSQL from "../modelsSQL/Commande.js";
import User from "../modelsSQL/User.js";

async function insertOrUpdateCommandeInMongo(commandeSQL) {
    const commandeMongo = await CommandeMongo.findById(commandeSQL.id).exec();

    const newCommande = {
        _id: commandeSQL.id,
        numero: commandeSQL.numero,
        statut: commandeSQL.statut,
        dateCommande: commandeSQL.dateCommande,
        dateLivraisonFinale: commandeSQL.dateLivraisonFinale,
        total: commandeSQL.total,
        trackingNumber: commandeSQL.trackingNumber,
        productArray: commandeSQL.productArray.map(product => ({
            _id: product.id,
            nom: product.nom,
            prix: product.prix,
            quantite: product.quantite
        })),
        user: {
            _id: commandeSQL.userId,
            nom: commandeSQL.User.nom,
            prenom: commandeSQL.User.prenom,
            email: commandeSQL.User.email
        }
    };

    if (commandeMongo) {
        const isSame = Object.keys(newCommande).every(key => 
            JSON.stringify(newCommande[key]) === JSON.stringify(commandeMongo[key])
        );

        if (!isSame) {
            await CommandeMongo.findByIdAndUpdate(commandeSQL.id, newCommande).exec();
        }
    } else {
        await CommandeMongo.create(newCommande);
    }
}

async function insertCommandeToMongo() {
    let commandes = await CommandeSQL.findAll({
        include: {
            model: User,
            attributes: ['nom', 'prenom', 'email']
        }
    });

    for (const commande of commandes) {
        await insertOrUpdateCommandeInMongo(commande);
    }
}

export default insertCommandeToMongo;
