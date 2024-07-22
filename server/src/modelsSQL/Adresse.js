import { DataTypes } from 'sequelize';
import { connection } from './dataBase.js';

const Adresse = connection.define('Adresse', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    voie: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['allée', 'avenue', 'boulevard', 'chemin', 'cours', 'impasse', 'passage', 'place', 'quai', 'route', 'rue', 'square', 'voie']]
        }
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d{1,3}[a-zA-Z]?$/
        }
    },
    rue: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\s-]{1,50}$/
        }
    },
    ville: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z\s-]{1,50}$/
        }
    },
    codePostal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^\d{5}$/
        }   
    },
    isDeliveryAddress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isBillingAddress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'Adresses'
});

export default Adresse;