import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Panier = connection.define('Panier', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    tableName: 'Paniers'
});

export default Panier;
