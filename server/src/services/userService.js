import User from "../modelsSQL/User.js";
import bcrypt from "bcryptjs";

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
  let user = await User.findByPk(id);
  if (!user) return null;

  if (
    (data.email && data.email !== user.email) ||
    (data.nom && data.nom !== user.nom) ||
    (data.prenom && data.prenom !== user.prenom) ||
    (data.telephone && data.telephone !== user.telephone) ||
    !comparePasswords(data.password, user.password)
  ) {

    if (data.email) user.email = data.email;
    if (data.nom) user.nom = data.nom;
    if (data.prenom) user.prenom = data.prenom;
    if (data.telephone) user.telephone = data.telephone;
    if (data.password) user.password = data.password;

    await user.save();

    user = await User.findByPk(id, {
      attributes: ["id", "nom", "prenom", "email", "telephone", "role"],
    });
  
    return user;
  } else return null;  
};


export const deleteUserById = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return user;
  }
  return null;
};

export const comparePasswords = async (inputPassword, userPassword) => {
  try {
    return await bcrypt.compare(inputPassword, userPassword);
  } catch (error) {
    console.error('Erreur lors de la comparaison des mots de passe:', error);
    throw error;
  }
};
