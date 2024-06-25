import Router from 'express';
import { register, login, confirmEmail, forgotPassword, resetPassword, resetPasswordPage, loginLimiter} from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', loginLimiter, login);
router.get('/confirm/:token', confirmEmail);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:token', resetPasswordPage);
router.post('/reset-password/:token', resetPassword);

export default router;