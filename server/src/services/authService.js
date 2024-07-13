import User from "../modelsSQL/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendConfirmationEmail, sendResetPasswordEmail, sendAccountBlockedEmail } from "../emailConfig.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const findUserById = async (id) => {
  return await User.findByPk(id);
};

export const createUser = async (userData) => {
  const newUser = await User.create(userData);

  // Send confirmation email
  const token = generateToken({ id: newUser.id }, process.env.REGISTER_JWT_KEY, "1h");
  await sendConfirmationEmail(newUser, token);

  return newUser;
};

export const comparePasswords = async (inputPassword, userPassword) => {
  try {
    return await bcrypt.compare(inputPassword, userPassword);
  } catch (error) {
    console.error('Erreur lors de la comparaison des mots de passe:', error);
    throw error;
  }
};

export const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const handlePasswordReset = async (user) => {
  const token = generateToken({ id: user.id }, process.env.RESET_PASSWORD_JWT_KEY, "1h");
  await sendResetPasswordEmail(user, token);
};

export const handleAccountBlocked = async (user) => {
  await sendAccountBlockedEmail(user);
};
