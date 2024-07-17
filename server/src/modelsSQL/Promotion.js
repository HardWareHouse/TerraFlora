import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Promotion = connection.define('Promotion', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    remise: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateDebut: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateFin: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Promotions'
});

export default Promotion;
