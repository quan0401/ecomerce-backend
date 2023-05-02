require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connection to mongodb success");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
