import "../modelsSQL/associations.js";
import { Op } from 'sequelize';
import { connectMongo } from "../modelsMongo/mongo.js";
import mongoose from "mongoose";
import UserMongo from "../modelsMongo/User.mongo.js";
import UserSQL from "../modelsSQL/User.js";


async function insertUserToMongo() {
  await connectMongo();

  let users = await UserSQL.findAll({
    where: {
        role: {
            [Op.ne]: "ROLE_ADMIN"
        }
    },
  });

  await UserMongo.create(
      users.map((user) => ({
          _id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          role: user.role,
          isVerified: user.isVerified,
          isBlocked: user.isBlocked,
      })),
  );
}

export default insertUserToMongo;
