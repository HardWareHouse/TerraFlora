import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Commande = connection.define('Commande', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCommande: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dateLivraisonPrevue: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dateLivraisonFinale: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Commandes'
});

export default Commande;
