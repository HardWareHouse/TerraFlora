import User from "../modelsSQL/User.js";
import bcrypt from "bcryptjs";

export const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: ["id", "nom", "prenom", "email", "telephone", "role"],
  });
};

export const getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: ["password"] } });
};

export const updateUserById = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  if (data.email) user.email = data.email;
  if (data.nom) user.nom = data.nom;
  if (data.prenom) user.prenom = data.prenom;
  if (data.telephone) user.telephone = data.telephone;
  if (data.role) user.role = data.role;

  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(data.password, salt);
  }

  await user.save();
  return user;
};

export const deleteUserById = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
};
