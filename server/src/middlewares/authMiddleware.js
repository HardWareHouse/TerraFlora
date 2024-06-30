import User from '../modelsSQL/User.js';
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.LOGIN_JWT_KEY);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'ROLE_ADMIN') {
        return res.status(403).json({ error: 'Access denied. Not an admin.' });
    }

    next();
};

export const authorizeUser = (req, res, next) => {
    if (req.user.role !== 'ROLE_USER') {
        return res.status(403).json({ error: 'Access denied. Not a user.' });
    }

    next();
};
