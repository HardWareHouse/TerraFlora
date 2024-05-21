import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Panier = sequelize.define('Panier', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
}, {
    tableName: 'Paniers'
});

export default Panier;
