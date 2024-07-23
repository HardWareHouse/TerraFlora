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
            isIn: [['En cours de traitement', 'Expédiée', 'Livrée', 'Annulée', 'Retournée']]
        }
    },
    dateCommande: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    dateLivraisonFinale: {
        type: DataTypes.DATE,
        allowNull: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    trackingNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productArray: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    }
}, {
    tableName: 'Commandes'
});

export default Commande;
