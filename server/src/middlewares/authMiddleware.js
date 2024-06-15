import User from '../modelsSQL/User.js';
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);

        if (!req.user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token.' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access denied. Not an admin.' });
    }

    next();
};

