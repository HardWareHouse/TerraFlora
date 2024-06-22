import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Commande = connection.define('Commande', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    }
}, {
    tableName: 'Commandes'
});

export default Commande;
