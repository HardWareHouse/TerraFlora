import { connection } from '../modelsSQL/dataBase.js';

connection
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .then(() => connection.close());