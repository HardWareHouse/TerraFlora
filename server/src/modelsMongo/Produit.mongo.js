import mongoose from 'mongoose';

const produitSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.UUID,
        default: () => new mongoose.Types.UUID(),
        primaryKey: true
    },
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
                type: mongoose.Schema.Types.UUID,
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
// produitSchema.index({"$**": "text"}, {name: "searchIndex"});


const Produit = mongoose.model('Produit', produitSchema);

export default Produit;
