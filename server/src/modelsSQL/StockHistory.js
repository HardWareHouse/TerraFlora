import { DataTypes } from "sequelize";
import { connection } from "./dataBase.js";

const StockHistory = connection.define(
  "StockHistory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    produitId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "StockHistories",
  }
);

export default StockHistory;
