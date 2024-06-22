import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const MethodePaiement = connection.define('MethodePaiement', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'MethodesPaiement'
});

export default MethodePaiement;
