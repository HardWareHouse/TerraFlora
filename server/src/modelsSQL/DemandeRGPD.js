import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const DemandeRGPD = connection.define('DemandeRGPD', {
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
