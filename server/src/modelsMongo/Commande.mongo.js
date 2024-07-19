import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { isEmailAddressValid } from "../helpers/emailAddressHelper.js";

const commandeSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        numero: {
            type: String,
            required: true,
            unique: true,
        },
        statut: {
            type: String,
            enum: ["En cours de traitement", "Expédiée", "Livrée", "Annulée", "Retournée"],
            required: true,
        },
        dateCommande: {
            type: Date,
            required: true,
        },
        dateLivraisonFinale: {
            type: Date,
            required: false,
        },
        total: {
            type: Number,
            required: true,
        },
        trackingNumber: {
            type: String,
            required: false,
        },
        user: {
            type: {
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
                    validate: {
                        validator: (email) => {
                            return isEmailAddressValid(email);
                        },
                        message: "Email is not valid",
                    },
                    required: true,
                }
            },
            required: true,
        },
    },
    {
        collection: "Commandes",
    }
);

commandeSchema.index(
    { 
        numero: "text",
        statut: "text",
        dateCommande: "text",
        total: "text",
        dateLivraisonFinale: "text",
        "user.email": "text"
    },
    { name: "searchIndex" }
);

const Commande = mongoose.model("Commande", commandeSchema);

export default Commande;
