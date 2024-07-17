import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Adresse = connection.define('Adresse', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    voie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codePostal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeliveryAddress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isBillingAddress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'Adresses'
});

export default Adresse;