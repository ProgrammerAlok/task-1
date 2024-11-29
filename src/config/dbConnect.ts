import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/crtd");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // @ts-ignore
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
