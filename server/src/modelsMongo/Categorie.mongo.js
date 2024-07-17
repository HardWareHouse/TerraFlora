import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const categorieSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true
        },
        nom: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        produits: {
            type: [
                {
                    _id: {
                        type: String,
                        default: uuidv4,
                        required: true
                    },
                    nom: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        required: false,
                    },
                    prix: {
                        type: Number,
                        required: true,
                    },
                },
            ],
            required: false,
            default: [],
        },
    },
    {
        collection: "Categories",
    }
);

categorieSchema.index(
    {nom: 'text', description: 'text'},
    {name: 'searchIndex'}
);

const Categorie = mongoose.model("Categories", categorieSchema);

export default Categorie;