import UserSQL from "../modelsSQL/User.js";
import UserMongo from "../modelsMongo/User.mongo.js";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail, sendResetPasswordEmail, sendAccountBlockedEmail } from "../emailConfig.js";

export const findUserByEmail = async (email) => {
  return await UserSQL.findOne({ where: { email } });
};

export const findUserById = async (id) => {
  return await UserSQL.findByPk(id);
};

export const createUser = async (userData) => {
  const newUser = await UserSQL.create(userData);
  if (!newUser) throw new Error("Error creating user");

  await UserMongo.create({
    _id: newUser.id,
    nom: newUser.nom,
    prenom: newUser.prenom,
    email: newUser.email,
    telephone: newUser.telephone,
    role: newUser.role,
    isVerified: newUser.isVerified,
    isBlocked: newUser.isBlocked,
    wantsMailNewProduct: newUser.wantsMailNewProduct,
    wantsMailRestockProduct: newUser.wantsMailRestockProduct,
    wantsMailChangingPrice: newUser.wantsMailChangingPrice,
    wantsMailNewsletter: newUser.wantsMailNewsletter,
  });

  // Send confirmation email
  const token = generateToken({ id: newUser.id }, process.env.REGISTER_JWT_KEY, "1h");
  await sendConfirmationEmail(newUser, token);

  return newUser;
};

export const verifiedMongoUser = async (id) => {
  try {
    const user = await UserMongo.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.isVerified = true;
    await user.save();
  } catch (error) {
    throw new Error(`Error verifying user: ${error.message}`);
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
