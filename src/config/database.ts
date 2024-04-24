import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not set.');
  }

  // If the database is already connected, don't connect again
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB is already connected');
    return;
  }

  const MAX_RETRIES = 3;
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(process.env.MONGO_URI ?? '');
      console.log('MongoDB connected...');
      break;
    } catch (error) {
      console.log(`Attempt ${retries + 1}: ${error}`);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

export default connectDB;
