import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const produitSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    prix: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    marque: {
        type: String,
        required: true
    },
    couleur: {
        type: String,
        required: true
    },
    taille: {
        type: String,
        required: true
    },
    isPromotion: {
        type: Boolean,
        default: false
    },
    pourcentagePromotion: {
        type: Number,
        default: 0,
        required: false
    },
    categorie:{
        type: {
            _id: {
                type: String,
                default: uuidv4,
                required: true
            },
            nom: {
                type: String,
                required: true
            },
        },
        required: true
    }
}, {
    collection: 'Produits'
});

produitSchema.index({nom: "text", description: "text"}, {name: "searchIndex"});

const Produit = mongoose.model('Produit', produitSchema);

export default Produit;
