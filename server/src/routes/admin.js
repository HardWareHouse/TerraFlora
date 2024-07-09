import Router from 'express';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authenticate);
router.use(authorizeAdmin);

router.get('/', (req, res) => {
    res.status(200).send('Welcome to the admin panel');
});

export default router;
