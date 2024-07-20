import { DataTypes } from "sequelize";
import { connection } from "./dataBase.js";

const DeletedUser = connection.define(
  "DeletedUser",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
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
