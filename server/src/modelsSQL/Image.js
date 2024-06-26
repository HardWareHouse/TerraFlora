import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';
import Produit from './Produit.js';

const Image = connection.define('Image', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    produitId: {
        type: DataTypes.UUID,
        references: {
            model: Produit,
            key: 'id'
        },
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Images'
});


export default Image;
