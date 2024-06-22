import { Sequelize } from 'sequelize';

const connection = new Sequelize('postgres://root:password@postgres:5432/app')

const connectToDatabase = async () => {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectToDatabase, connection };
