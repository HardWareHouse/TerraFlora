import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Contact = connection.define('Contact', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 50,
            min: 5
        }
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            max: 300,
            min: 5
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    dateContact: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'En cours de traitement',
        validate: {
            isIn: [['En cours de traitement', 'traité', 'non traité']]
        },
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            max: 500,
            min: 5
        }
    },
    dateResponse: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isResponded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'Contacts'
});

export default Contact;