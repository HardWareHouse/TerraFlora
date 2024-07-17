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
        allowNull: false,
        unique: true
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'En cours de traitement',
        validate: {
            isIn: [['En attente', 'En cours de traitement', 'Expédiée', 'Livrée', 'Annulée', 'Retournée']]
        }
    },
    dateCommande: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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
