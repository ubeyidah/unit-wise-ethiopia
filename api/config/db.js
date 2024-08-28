import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connectd successfully.");
  } catch (error) {
    console.log("database coudn't connect.");
  }
};

export default connectDb;
