import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { isEmailAddressValid } from "../helpers/emailAddressHelper.js";

const factureSchema = new mongoose.Schema(
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
        statutPaiement: {
            type: String,
            enum: ['En attente', 'En cours de paiement', 'Payée', 'Impayée'],
            required: true,
        },
        dateFacturation: {
            type: Date,
            required: true,
        },
        datePaiementDue: {
            type: Date,
            required: false,
        },
        total: {
            type: Number,
            required: true,
        },
        incoiceUrl: {
            type: String,
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
        commande: {
            type: {
                numero: {
                    type: String,
                    required: true,
                }
            },
            required: true,
        },
    },
    {
        collection: "Factures",
    }
);

factureSchema.index(
    { 
        numero: "text", 
        statut: "text", 
        dateFacture: "text",
        "user.nom": "text", 
        "user.prenom": "text", 
        "user.email": "text", 
        "commande.numero": "text" 
    },
    { name: "searchIndex" }
);

const Facture = mongoose.model("Facture", factureSchema);

export default Facture;