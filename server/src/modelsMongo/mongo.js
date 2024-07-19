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
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
} 

export const disconnectMongo = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.log('Error closing MongoDB connection:', error);
    process.exit(1);
  }
};
