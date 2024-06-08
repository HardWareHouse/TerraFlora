import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const DemandeRGPD = sequelize.define('DemandeRGPD', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    statut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeDemande: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateTraitement: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    tableName: 'DemandesRGPD'
});

export default DemandeRGPD;
