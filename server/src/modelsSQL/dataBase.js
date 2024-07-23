import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize(process.env.POSTGRES_LINK, {dialect: 'postgres'});

const connectToDatabase = async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectToDatabase, connection };
