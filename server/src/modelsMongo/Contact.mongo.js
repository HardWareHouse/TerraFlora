import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const contactSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dateContact: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['En cours de traitement', 'traité', 'non traité']
        },
        response: {
            type: String,
            required: false,
        },
        dateResponse: {
            type: Date,
            required: false,
        },
        isResponded: {
            type: Boolean,
            required: true,
        },
        user: {
            type: {
                _id: {
                    type: String,
                    default: uuidv4,
                    required: true,
                },
                nom: {
                    type: String,
                    required: true,
                },
                prenom: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        }
    },
    {
        collection: "Contacts",
    }
);

contactSchema.index(
    {
        subject: 'text', 
        message: 'text', 
        email: 'text',
        status: 'text',
        "user.email": 'text',
    },
    { name: "searchIndex" }
);

const Contact = mongoose.model("Contacts", contactSchema);

export default Contact;