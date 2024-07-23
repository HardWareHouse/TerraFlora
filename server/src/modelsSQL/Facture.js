import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Facture = connection.define('Facture', {
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
    dateFacturation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    datePaiementDue: {
        type: DataTypes.DATE,
        allowNull: true
    },
    statutPaiement: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'En attente',
        validate: {
            isIn: [['En attente', 'En cours de paiement', 'Payée', 'Impayée']]  
        }
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    invoiceUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Factures'
});

export default Facture;
