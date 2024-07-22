import "../modelsSQL/associations.js";
import ContactMongo from "../modelsMongo/Contact.mongo.js";
import ContactSQL from "../modelsSQL/Contact.js";
import User from "../modelsSQL/User.js";

async function insertOrUpdateContactInMongo(contactSQL) {
    const contactMongo = await ContactMongo.findById(contactSQL.id).exec();

    const newContact = {
        _id: contactSQL.id,
        subject: contactSQL.subject,
        message: contactSQL.message,
        email: contactSQL.email,
        dateContact: contactSQL.dateContact,
        status: contactSQL.status,
        response: contactSQL.response,
        dateResponse: contactSQL.dateResponse,
        isResponded: contactSQL.isResponded,
        user: {
            _id: contactSQL.User.id,
            nom: contactSQL.User.nom,
            prenom: contactSQL.User.prenom,
            email: contactSQL.User.email,
        },
    };

    if (contactMongo) {
        const isSame = Object.keys(newContact).every(key => 
            JSON.stringify(newContact[key]) === JSON.stringify(contactMongo[key])
        );

        if (!isSame) {
            await ContactMongo.findByIdAndUpdate(contactSQL.id, newContact).exec();
        }
    } else {
        await ContactMongo.create(newContact);
    }
}

async function insertContactToMongo() {
    let contacts = await ContactSQL.findAll({
        include: {
            model: User,
            attributes: ['id', 'nom', 'prenom', 'email']
        }
    });

    for (const contact of contacts) {
        await insertOrUpdateContactInMongo(contact);
    }
}

export default insertContactToMongo;
