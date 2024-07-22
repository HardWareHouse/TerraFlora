import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const adresseSchema = new mongoose.Schema( 
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        voie: {
            type: String,
            required: true,
        },
        numero: {
            type: String,
            required: true,
        },
        rue: {
            type: String,
            required: true,
        },  
        ville: {
            type: String,
            required: true,
        },
        codePostal: {
            type: String,
            required: true,
        },
        isDeliveryAddress: {
            type: Boolean,
            default: false,
            required: true,
        },
        isBillingAddress: {
            type: Boolean,
            default: false,
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
        collection: "Adresses",
    }
);

adresseSchema.index(
    {
        rue: 'text', 
        ville: 'text', 
        codePostal: 'text',
    },
    {name: 'searchIndex'}
);

const Adresse = mongoose.model("Adresses", adresseSchema);

export default Adresse;