require("dotenv").config();
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection success");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
