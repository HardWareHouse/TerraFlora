import * as authService from "../services/authService.js";
import { isPasswordExpired, isPasswordValid, comparePasswords } from "../helpers/passwordHelper.js";
import rateLimit from "express-rate-limit";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Il faut remplir tous les champs !" });
    }

    const user = await authService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Compte non vérifié. Veuillez vérifier votre compte pour vous connecter.' });
    }

    if (user.isBlocked) {
      return res.status(401).json({ message: 'Compte bloqué. Veuillez contacter l\'administrateur pour plus d\'informations.' });
    }

    if (isPasswordExpired(user.lastUpdatedPassword)) {
      await authService.handlePasswordReset(user);
      return res.status(401).json({ message: 'Votre mot de passe a expiré. Un lien de réinitialisation a été envoyé à votre adresse e-mail.' });
    }

    const loginToken = authService.generateToken({ id: user.id }, process.env.LOGIN_JWT_KEY, '1h');
    const mailPreferenceToken = authService.generateToken({ id: user.id, email: user.email }, process.env.MAIL_PREFERENCE_JWT_KEY, '1h');

    const userWithoutPassword = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
      role: user.role,
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
      haveConsented,
      wantsMailNewProduct,
      wantsMailRestockProduct,
      wantsMailChangingPrice,
      wantsMailNewsletter,
    } = req.body;

    if (email !== email_cfg || password !== password_cfg) {
      return res.status(400).json({ msg: "Les confirmations ne sont pas bonnes!" });
    }

    if (!email || !password || !nom || !prenom) {
      return res.status(400).json({ msg: "Il faut remplir tous les champs !" });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({ msg: "Le mot de passe doit contenir au moins 12 caractères, incluant des symboles, chiffres, lettres minuscules et majuscules." });
    }

    const existingUser = await authService.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ msg: "Erreur lors de l'inscription" });
    }

    const newUser = await authService.createUser({
      nom,
      prenom,
      email,
      password,
      lastUpdatedPassword: new Date(),
      telephone,
      role: 'ROLE_USER',
      haveConsented,
      isVerified: false,
      wantsMailNewProduct,
      wantsMailRestockProduct,
      wantsMailChangingPrice,
      wantsMailNewsletter,
    });

    const userWithoutPassword = {
      nom: newUser.nom,
      prenom: newUser.prenom,
      email: newUser.email,
      telephone: newUser.telephone
    };

    res.status(201).json({ userWithoutPassword, msg: "Utilisateur créé avec succès. Veuillez vérifier votre email pour confirmer votre compte." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = authService.verifyToken(token, process.env.REGISTER_JWT_KEY);
    const user = await authService.findUserById(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: "Erreur lors de la confirmation de l'email." });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: "Email déjà confirmé." });
    }

    user.isVerified = true;
    authService.verifiedMongoUser(user.id);
    await user.save();

    res.status(200).json({ msg: "Email confirmé avec succès." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authService.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ msg: "Erreur lors de la réinitialisation du mot de passe." });
    }

    await authService.handlePasswordReset(user);

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
      return res.status(400).json({ msg: "Les mots de passe ne correspondent pas." });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({ msg: "Le mot de passe doit contenir au moins 12 caractères, incluant des symboles, chiffres, lettres minuscules et majuscules." });
    }

    const decoded = authService.verifyToken(token, process.env.RESET_PASSWORD_JWT_KEY);
    const user = await authService.findUserById(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: "Erreur lors de la réinitialisation du mot de passe." });
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
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Réinitialisation du mot de passe</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background-color: #fff;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        h1 {
          color: #333;
          margin-bottom: 20px;
          font-size: 24px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 5px;
          color: #555;
          text-align: left;
        }
        input {
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        button {
          padding: 10px;
          background-color: #dc3545;
          border: none;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #c82333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Réinitialisez votre mot de passe</h1>
        <form action="/auth/reset-password/${token}" method="POST">
          <input type="hidden" name="token" value="${token}" />
          <label for="password">Nouveau mot de passe:</label>
          <input type="password" id="password" name="password" required>
          <label for="password_cfg">Confirmation du mot de passe:</label>
          <input type="password" id="password_cfg" name="password_cfg" required>
          <button type="submit">Réinitialiser</button>
        </form>
      </div>
    </body>
    </html>
  `);
};

const loginAttempts = {};

export const loginLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 3,
  handler: async (req, res, next) => {
    const { email } = req.body;
    const user = await authService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide.' });
    }

    if (!loginAttempts[email]) {
      loginAttempts[email] = 1;
    } else {
      loginAttempts[email] += 1;
    }

    if (loginAttempts[email] > 3) {
      user.isBlocked = true;
      await user.save();
      await authService.handleAccountBlocked(user);
      return res.status(403).json({ message: 'Trop de tentatives de connexion. Votre compte a été bloqué.' });
    }

    next();
  },
  onLimitReached: (req, res, next) => {
    const { email } = req.body;
    loginAttempts[email] = 1;
    next();
  }
});
