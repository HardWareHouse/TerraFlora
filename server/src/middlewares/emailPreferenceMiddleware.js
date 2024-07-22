import jwt from 'jsonwebtoken';
import User from "../modelsSQL/User.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.MAIL_PREFERENCE_JWT_KEY);
    if (!decoded) {
      return res.status(400).json({ message: 'Token is invalid' });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'Token is invalid' });
    }

    if (!user.isVerified) {
      console.log('User not verified');
      return res.status(400).json({ message: 'Token is invalid'});
    }

    if (user.isBlocked) {
      console.log('User is blocked');
      return res.status(400).json({ message: 'Token is invalid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
