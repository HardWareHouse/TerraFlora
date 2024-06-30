import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Adresse = connection.define('Adresse', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    rue: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
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
    }
}, {
    tableName: 'Adresses'
});

export default Adresse;