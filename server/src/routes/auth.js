import Router from 'express';
import { register, login, confirmEmail, forgotPassword, resetPassword, resetPasswordPage } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = Router();

// Configurer le limiteur de taux pour les tentatives de connexion
const loginLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 3, // Limiter chaque IP à 3 requêtes par 'window' (ici, par 3 minutes)
    message: "Trop de tentatives de connexion, veuillez réessayer plus tard."
});

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/confirm/:token', confirmEmail );
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/reset-password/:token', resetPasswordPage);

export default router;