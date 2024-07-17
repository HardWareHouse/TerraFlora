import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
export const connectMongo = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING,
      {
        dbName: 'terraflora',
        auth: {
          username: process.env.MONGODB_USER,
          password: process.env.MONGODB_PASSWORD,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
} 
