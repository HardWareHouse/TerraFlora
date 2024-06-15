import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Facture = sequelize.define('Facture', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    }
}, {
    tableName: 'Factures'
});

export default Facture;
