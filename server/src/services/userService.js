import User from "../modelsSQL/User.js";
import DeletedUser from "../modelsSQL/DeletedUser.js";
import { comparePasswords } from "../helpers/passwordHelper.js";
import { Sequelize } from "sequelize";

export const getUser = async (id) => {
  return await User.findByPk(id);
};

export const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: ["id", "nom", "prenom", "email", "telephone", "role"],
  });
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: ["password"] } });
};

export const updateUserById = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  const isPasswordMatch = data.password
    ? await comparePasswords(data.password, user.password)
    : true;

  const fieldsToUpdate = {};

  if (data.email && data.email !== user.email)
    fieldsToUpdate.email = data.email;
  if (data.nom && data.nom !== user.nom) fieldsToUpdate.nom = data.nom;
  if (data.prenom && data.prenom !== user.prenom)
    fieldsToUpdate.prenom = data.prenom;
  if (data.telephone && data.telephone !== user.telephone)
    fieldsToUpdate.telephone = data.telephone;
  if (data.password && !isPasswordMatch)
    fieldsToUpdate.password = data.password;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({ error: "No data to update" });
  }

  Object.assign(user, fieldsToUpdate);
  await user.save();

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
