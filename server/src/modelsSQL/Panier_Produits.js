import { DataTypes } from 'sequelize';
import { connection } from "./dataBase.js";

const Panier_Produits = connection.define('Panier_Produits', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: false,
});

export default Panier_Produits;
