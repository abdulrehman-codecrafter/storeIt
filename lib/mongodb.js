import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/** Cached connection for MongoDB */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
      })
      .then((mongoose) => {
        console.log("MongoDB connected successfully.");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error; // Prevent app from running if connection fails
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error awaiting MongoDB connection:", error);
    throw error;
  }
}

export default dbConnect;
