import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Categorie = connection.define('Categorie', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Categories',
});

export default Categorie;
