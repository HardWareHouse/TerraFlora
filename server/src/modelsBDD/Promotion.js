import { DataTypes } from 'sequelize';
import { sequelize } from '../dataBase.js';

const Promotion = sequelize.define('Promotion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    remise: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateFin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateDebut: {
        type: DataTypes.DATE,
        allowNull: false
    },
    produitId: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    tableName: 'Promotions'
});

export default Promotion;
