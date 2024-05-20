import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Facture = sequelize.define('Facture', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateFacturation: {
        type: DataTypes.DATE,
        allowNull: false
    },
    datePaiementDue: {
        type: DataTypes.DATE,
        allowNull: true
    },
    statutPaiement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
}, {
    tableName: 'Factures'
});

export default Facture;
