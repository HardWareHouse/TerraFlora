import express from 'express';
import { connectToDatabase, sequelize } from './dataBase.js';
import './mongo.js';
import '../src/modelsSQL/associations.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import produitRouter from './routes/produit.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(bodyParser.json()); 
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use('/users', userRouter);
server.use('/auth', authRouter);
server.use('/product', produitRouter);

server.listen(8000, '0.0.0.0', () => {
  console.log('Server listening on port 8000');
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

connectToDatabase().then(() => {
  sequelize.sync().then(() => {
    console.log('Database & tables created!');
  }).catch(error => {
    console.error('Unable to sync database:', error);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
