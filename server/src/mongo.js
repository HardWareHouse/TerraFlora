import mongoose from 'mongoose';

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
