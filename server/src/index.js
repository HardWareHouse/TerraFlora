import express from 'express';
import { indexRouter } from './routes/index.js';
import { connectToDatabase, sequelize } from './dataBase.js';
import '../src/modelsBDD/associations.js';

const server = express();

server.use("/", indexRouter);

server.listen(8000, '0.0.0.0', () => {
  console.log('Server listening on http://localhost:8000');
});

connectToDatabase().then(() => {
  sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
  }).catch(error => {
    console.error('Unable to sync database:', error);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
