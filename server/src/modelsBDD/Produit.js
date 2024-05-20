import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Produit = sequelize.define('Produit', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
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
    isPromotion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    pourcentagePromotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    categorieId: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    tableName: 'Produits'
});

export default Produit;
