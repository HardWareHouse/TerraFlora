import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Commande = sequelize.define('Commande', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCommande: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateLivraisonPrevue: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dateLivraisonFinale: {
        type: DataTypes.DATE,
        allowNull: true
    },
    produitId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    panierId: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    tableName: 'Commandes'
});

export default Commande;
