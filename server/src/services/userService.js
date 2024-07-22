import UserSQL from "../modelsSQL/User.js";
import UserMongo from "../modelsMongo/User.mongo.js";
import DeletedUser from "../modelsSQL/DeletedUser.js";
import { comparePasswords } from "../helpers/passwordHelper.js";
import { get } from "mongoose";

const getUserWithAlias = async (id) => {
  return await UserMongo.aggregate([
    { $match: { _id: id } },
    {
      $project: {
        id: "$_id",
        nom: 1,
        prenom: 1,
        email: 1,
        telephone: 1,
        role: 1,
        wantsMailNewProduct: 1,
        wantsMailRestockProduct: 1,
        wantsMailChangingPrice: 1,
        wantsMailNewsletter: 1,
        _id: 0,
      },
    },
  ]).then((results) => results[0] || null);
};

export const getAllUsers = async () => {
  return await UserMongo.find().select({
    id: "$_id",
    nom: 1,
    prenom: 1,
    email: 1,
    telephone: 1,
    role: 1,
    wantsMailNewProduct: 1,
    wantsMailRestockProduct: 1,
    wantsMailChangingPrice: 1,
    wantsMailNewsletter: 1,
    _id: 0,
  });
};
import { Sequelize } from "sequelize";

export const getUser = async (id) => {
  return await UserSQL.findByPk(id);
};

export const getUserById = async (id) => {
  return getUserWithAlias(id);
};

export const getUserByEmail = async (email) => {
  return await UserMongo.aggregate([
    { $match: { email: email } },
    {
      $project: {
        id: "$_id",
        nom: 1,
        prenom: 1,
        email: 1,
        telephone: 1,
        role: 1,
        _id: 0,
      },
    },
  ]).then((results) => results[0] || null);
};

export const updateUserById = async (id, data) => {
  const user = await UserSQL.findByPk(id);
  if (!user) return null;

  const isPasswordMatch = data.password
    ? await comparePasswords(data.password, user.password)
    : true;

  const fieldsToUpdate = {};
  const fieldsToUpdateMongo = {};

  if (data.email && data.email !== user.email) {
    fieldsToUpdate.email = data.email;
    fieldsToUpdateMongo.email = data.email;
  }

  if (data.nom && data.nom !== user.nom) {
    fieldsToUpdate.nom = data.nom;
    fieldsToUpdateMongo.nom = data.nom;
  }

  if (data.prenom && data.prenom !== user.prenom) {
    fieldsToUpdate.prenom = data.prenom;
    fieldsToUpdateMongo.prenom = data.prenom;
  }

  if (data.telephone && data.telephone !== user.telephone) {
    fieldsToUpdate.telephone = data.telephone;
    fieldsToUpdateMongo.telephone = data.telephone;
  }

  if (data.password && !isPasswordMatch)
    fieldsToUpdate.password = data.password;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }

  Object.assign(user, fieldsToUpdate);
  await user.save();

  await UserMongo.findByIdAndUpdate(
    id,
    { $set: fieldsToUpdateMongo },
    { new: true }
  );

  return getUserById(id);
};

// export const deleteUserById = async (id) => {
//   const user = await User.findByPk(id);
//   if (user) {
//     await user.destroy();
//     return user;
//   }
//   return null;
// };
export const deleteUserById = async (id) => {
  const connection = new Sequelize(process.env.POSTGRES_LINK, {
    dialect: "postgres",
  });

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    const {
      id: userId,
      nom: userNom,
      prenom: userPrenom,
      email: userEmail,
      password: userPassword,
      telephone: userTelephone,
      ...userData
    } = user.toJSON();

    await DeletedUser.create(userData);

    await user.destroy();
    return user;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

// export const deleteUserById = async (id) => {
//   try {
//     const userSQL = await UserSQL.findByPk(id);
//     if (userSQL) {
//       await userSQL.destroy();
//       await UserMongo.findByIdAndDelete(id);
//       return true;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     throw new Error("Failed to delete user");
//   }
// };
