import { DataTypes } from "sequelize";
import { connection } from "./dataBase.js";

const DeletedUser = connection.define(
  "DeletedUser",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    haveConsented: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastUpdatedPassword: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    wantsMailNewProduct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wantsMailRestockProduct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wantsMailChangingPrice: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wantsMailNewsletter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {}
);

export default DeletedUser;
