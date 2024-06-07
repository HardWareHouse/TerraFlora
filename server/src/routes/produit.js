import Router from 'express';
import { getProducts } from '../controllers/produitController.js';

const router = Router();

router.get('/', getProducts);


export default router;
