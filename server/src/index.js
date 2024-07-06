import express from 'express';
import { connectToDatabase, connection } from './modelsSQL/dataBase.js';
import './mongo.js';
import '../src/modelsSQL/associations.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';
import invoiceRouter from './routes/invoice.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import produitRouter from './routes/produit.js';
import emailPreferenceRoutes from './routes/emailPreference.js';
import categorieRoutes from './routes/categorie.js';
import adresseRoutes from './routes/adresse.js';
import path from 'path';

dotenv.config();

const server = express();

server.use(bodyParser.json()); 
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use('/users', userRouter);
server.use('/auth', authRouter);
server.use('/admin', adminRouter);
server.use('/orders', orderRouter);
server.use('/invoices', invoiceRouter);
server.use('/address', adresseRoutes);
server.use('/product', produitRouter);
server.use('/categories', categorieRoutes);
server.use('/emailPreferences', emailPreferenceRoutes);
server.use('/uploads', express.static(path.join('src/uploads')));

server.listen(8000, '0.0.0.0', () => {
  console.log('Server listening on port 8000');
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

connectToDatabase().then(() => {
  connection.sync().then(() => {
    console.log('Database & tables created!');
  }).catch(error => {
    console.error('Unable to sync database:', error);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
