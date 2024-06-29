import User from "../modelsSQL/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import {
  sendConfirmationEmail,
  sendResetPasswordEmail,
  sendAccountBlockedEmail,
} from "../emailConfig.js";

const isPasswordValid = (password) => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

const isPasswordExpired = (lastUpdatedPassword) => {
  const now = new Date();
  const diffInDays = Math.floor(
    (now - lastUpdatedPassword) / (1000 * 60 * 60 * 24)
  );
  return diffInDays >= 60;
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Il faut remplir tous les champs !" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Account not verified. Please verify your account to log in.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (isPasswordExpired(user.lastUpdatedPassword)) {
      const token = jwt.sign({ id: user.id }, process.env.RESET_PASSWORD_JWT_KEY, { expiresIn: '1h' });
      await sendResetPasswordEmail(user, token);
      return res.status(401).json({ message: 'Your password has expired. A reset link has been sent to your email.' });
    }

    // Générer les tokens
    const loginToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.LOGIN_JWT_KEY, { expiresIn: '1h' });
    const mailPreferenceToken = jwt.sign({ id: user.id, email: user.email }, process.env.MAIL_PREFERENCE_JWT_KEY, { expiresIn: '1h' });

    const userWithoutPassword = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      role: user.role,
      haveConsented: user.haveConsented,
      isBlocked: user.isBlocked,
      isVerified: user.isVerified,
      lastUpdatedPassword: user.lastUpdatedPassword,
      wantsMailNewProduct: user.wantsMailNewProduct,
      wantsMailRestockProduct: user.wantsMailRestockProduct,
      wantsMailChangingPrice: user.wantsMailChangingPrice,
      wantsMailNewsletter: user.wantsMailNewsletter
    };

    res.status(200).json({ loginToken, mailPreferenceToken, user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      email_cfg,
      password,
      password_cfg,
      telephone,
      role,
      haveConsented,
      wantsMailNewProduct,
      wantsMailRestockProduct,
      wantsMailChangingPrice,
      wantsMailNewsletter,
    } = req.body;

    if (email !== email_cfg || password !== password_cfg) {
      return res.status(400).json({
        msg: "Les confirmations ne sont pas bonnes!",
      });
    }

    if (!email || !password || !nom || !prenom) {
      return res.status(400).json({ msg: "Il faut remplir tous les champs !" });
    }

    if (!isPasswordValid(password)) {
      return res
        .status(400)
        .json({
          msg: "Le mot de passe doit contenir au moins 12 caractères, incluant des symboles, chiffres, lettres minuscules et majuscules.",
        });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ msg: "L'email existe déjà" });
    }

    const newUser = await User.create({
      nom,
      prenom,
      email,
      password,
      telephone,
      role,
      haveConsented,
      isVerified: false,
      lastUpdatedPassword: new Date(),
      wantsMailNewProduct,
      wantsMailRestockProduct,
      wantsMailChangingPrice,
      wantsMailNewsletter,
    });

    // Generate confirmation token
    const token = jwt.sign({ id: newUser.id }, process.env.REGISTER_JWT_KEY, {
      expiresIn: "1h",
    });

    // Send confirmation email
    await sendConfirmationEmail(newUser, token);

    res
      .status(201)
      .json({
        newUser,
        msg: "Utilisateur créé avec succès. Veuillez vérifier votre email pour confirmer votre compte.",
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.REGISTER_JWT_KEY);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: "Utilisateur non trouvé." });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: "Email déjà confirmé." });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: "Email confirmé avec succès." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: "Utilisateur non trouvé." });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.RESET_PASSWORD_JWT_KEY,
      { expiresIn: "1h" }
    );

    await sendResetPasswordEmail(user, token);

    res.status(200).json({ msg: "Email de réinitialisation envoyé." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, password_cfg } = req.body;

    if (password !== password_cfg) {
      return res
        .status(400)
        .json({ msg: "Les mots de passe ne correspondent pas." });
    }

    if (!isPasswordValid(password)) {
      return res
        .status(400)
        .json({
          msg: "Le mot de passe doit contenir au moins 12 caractères, incluant des symboles, chiffres, lettres minuscules et majuscules.",
        });
    }

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_JWT_KEY);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: "Utilisateur non trouvé." });
    }

    user.password = password;
    user.lastUpdatedPassword = new Date();
    await user.save();

    res.status(200).json({ msg: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPasswordPage = (req, res) => {
  const { token } = req.params;
  res.send(`
    <form action="/auth/reset-password/${token}" method="POST">
      <input type="hidden" name="token" value="${token}" />
      <label for="password">New Password:</label>
      <input type="password" id="password" name="password" required>
      <label for="password_cfg">Confirm New Password:</label>
      <input type="password" id="password_cfg" name="password_cfg" required>
      <button type="submit">Reset Password</button>
    </form>
  `);
};

const loginAttempts = {};

export const loginLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 3,
  handler: async (req, res, next) => {
    const { email } = req.body;
    if (!loginAttempts[email]) {
      loginAttempts[email] = 0;
    }
    loginAttempts[email]++;
    
    if (loginAttempts[email] >= 3) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        await sendAccountBlockedEmail(user);
      }
      return res.status(429).json({
        message: "Trop de tentatives de connexion. Votre compte est temporairement bloqué et sera débloqué dans 10 minutes.",
      });
    } else {
      next();
    }
  },
  onLimitReached: (req, res) => {
    const { email } = req.body;
    loginAttempts[email] = 0; 
  },
});

export const verifyToken = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if(!token) {
      return res.status(400).json({ msg: "Token manquant." });
    }

    const decoded = jwt.verify(token, process.env.LOGIN_JWT_KEY);
    if (!decoded) {
      return res.status(400).json({ msg: "Token invalide." });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(400).json({ msg: "Utilisateur non trouvé." });
    }

    res.status(200).json({ userId: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};