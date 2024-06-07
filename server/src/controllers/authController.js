import User from '../modelsSQL/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const isPasswordValid = (password) => {
    const minLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

export const register = async (req, res) => {
  try {
    const { nom, prenom, email, email_cfg, password, password_cfg, telephone, role, haveConsented } = req.body;
    
    if (email !== email_cfg || password !== password_cfg){
      return res.status(500).json({
          msg: "Les confirmations ne sont pas bonnes!"
      })
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

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Il faut remplir tous les champs !" });
    }

    try {
      const user  = await User.findOne({ where: { email } });

      if (!user.isVerified) {
        return res.status(401).json({ message: 'Account not verified. Please verify your account to log in.' });
      }

      if (!user) {
          return res.status(500).json({
              msg: "Pas de email" + error
          })
      }
      else if(user && await bcrypt.compare(password, user.password) ){
          const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
          return res.status(200).json({token, user});
      }
      // Vérification si le compte est vérifié
      else{
          return res.status(500).json({
              msg: "MDP PAS BON"
          })
      }
  } catch (error) {
      return res.status(500).json({
          msg: "ca marche pas du tout " + error
      })
  }  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
