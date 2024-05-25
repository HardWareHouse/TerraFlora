import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const MethodePaiement = sequelize.define('MethodePaiement', {
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
