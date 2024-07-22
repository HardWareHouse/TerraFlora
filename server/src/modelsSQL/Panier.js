import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Panier = connection.define('Panier', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    tableName: 'Paniers'
});

export default Panier;
