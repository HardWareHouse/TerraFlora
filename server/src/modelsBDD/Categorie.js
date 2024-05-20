import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Categorie = sequelize.define('Categorie', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: 'Categories'
});

export default Categorie;
