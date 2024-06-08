import User from '../modelsBDD/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendConfirmationEmail, sendResetPasswordEmail } from '../emailConfig.js';

const isPasswordValid = (password) => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
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

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { nom, prenom, email, email_cfg, password, password_cfg, telephone, role, haveConsented } = req.body;
    
    if (email !== email_cfg || password !== password_cfg) {
      return res.status(500).json({
        msg: "Les confirmations ne sont pas bonnes!"
      });
    }

    if (!email || !password || !nom || !prenom) {
      return res.status(400).json({ msg: "Il faut remplir tous les champs !" });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({ msg: "Le mot de passe doit contenir au moins 12 caractères, incluant des symboles, chiffres, lettres minuscules et majuscules." });
    }

    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ msg: "L'email existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({ 
      nom, 
      prenom, 
      email, 
      password: hashedPassword, 
      telephone, 
      role, 
      haveConsented,
      isVerified: false,
    });

    // Generate confirmation token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send confirmation email
    await sendConfirmationEmail(newUser, token);

    res.status(201).json({ newUser, msg: "Utilisateur créé avec succès. Veuillez vérifier votre email pour confirmer votre compte." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyMWYyOTY5LTg1MDgtNGMyOC1iNTk2LWFmMGFlZDU2ZmE3ZCIsImlhdCI6MTcxNzcwMDkyOCwiZXhwIjoxNzE3NzA0NTI4fQ.jj8yA5hCunh-PumbheBlpclZiwv7Wz98fHjId28cV0I
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyMWYyOTY5LTg1MDgtNGMyOC1iNTk2LWFmMGFlZDU2ZmE3ZCIsImlhdCI6MTcxNzcwMDkyOCwiZXhwIjoxNzE3NzA0NTI4fQ.jj8yA5hCunh-PumbheBlpclZiwv7Wz98fHjId28cV0I

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyMWYyOTY5LTg1MDgtNGMyOC1iNTk2LWFmMGFlZDU2ZmE3ZCIsImlhdCI6MTcxNzcwMDk4NCwiZXhwIjoxNzE3NzA0NTg0fQ.kPyYADdxwLrgKt40nMTEod_RzWd95rBTyuQM-WnYryE
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyMWYyOTY5LTg1MDgtNGMyOC1iNTk2LWFmMGFlZDU2ZmE3ZCIsImlhdCI6MTcxNzcwMDk4NCwiZXhwIjoxNzE3NzA0NTg0fQ.kPyYADdxwLrgKt40nMTEod_RzWd95rBTyuQM-WnYryE
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: 'Utilisateur non trouvé.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ msg: 'Email déjà confirmé.' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: 'Email confirmé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ///////////////////////////////////////////////////////////////

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: 'Utilisateur non trouvé.' });
    }

    // Génération du token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Envoi de l'email de réinitialisation
    await sendResetPasswordEmail(user, token);

    res.status(200).json({ msg: 'Email de réinitialisation envoyé.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, password_cfg } = req.body;

    if (password !== password_cfg) {
      return res.status(400).json({ msg: 'Les mots de passe ne correspondent pas.' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({ msg: 'Le mot de passe doit contenir au moins 12 caractères, incluant des symboles, chiffres, lettres minuscules et majuscules.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(400).json({ msg: 'Utilisateur non trouvé.' });
    }

    user.password = await bcrypt.hash(password, 5);
    await user.save();

    res.status(200).json({ msg: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fonction pour afficher la page de réinitialisation du mot de passe
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