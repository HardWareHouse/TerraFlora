import "../modelsSQL/associations.js";
import { connectMongo } from "../modelsMongo/mongo.js";
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

export default insertContactToMongo;