import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Panier = sequelize.define('Panier', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    tableName: 'Paniers'
});

export default Panier;
