import "../modelsSQL/associations.js";
import { connectMongo } from "../mongo.js";
import mongoose from "mongoose";
import ContactMongo from "../modelsMongo/Contact.mongo.js";
import ContactSQL from "../modelsSQL/Contact.js";
import User from "../modelsSQL/User.js";

async function insertContactToMongo() {
    await connectMongo();

    let contacts = await ContactSQL.findAll(
        {
            include: User,
        }
    );

    await ContactMongo.create(
        contacts.map((contact) => ({
            _id: contact.id,
            subject: contact.subject,
            message: contact.message,
            email: contact.email,
            dateContact: contact.dateContact,
            status: contact.status,
            response: contact.response,
            dateResponse: contact.dateResponse,
            isResponded: contact.isResponded,
            user: {
                nom: contact.User.nom,
                prenom: contact.User.prenom,
                email: contact.User.email,
            },
        }))
    );
}

insertContactToMongo()
    .then(() => {
        console.log("Contacts inserted successfully");
        mongoose.connection.close();
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        mongoose.connection.close();
        process.exit(1);
    });