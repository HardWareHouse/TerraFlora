import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Produit = sequelize.define('Produit', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marque: {
        type: DataTypes.STRING,
        allowNull: false
    },
    couleur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    taille: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPromotion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    pourcentagePromotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    }
}, {
    tableName: 'Produits'
});

export default Produit;
