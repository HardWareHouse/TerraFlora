import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

const Paiement = sequelize.define('Paiement', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    datePaiement: {
        type: DataTypes.DATE,
        allowNull: false
    },
    montant: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    methodePaiement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    produitId: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    tableName: 'Paiements'
});

export default Paiement;