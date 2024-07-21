import { DataTypes } from 'sequelize';
import { connection } from "./dataBase.js";

const Panier_Produits = connection.define('Panier_Produits', {
  panierId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  produitId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: false,
});

export default Panier_Produits;
