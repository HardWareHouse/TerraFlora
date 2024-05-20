import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('postgres://root:password@postgres:5432/app')

export async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}