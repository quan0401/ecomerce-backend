import jwt from "jsonwebtoken";
require("dotenv").config();

const generateAuthToken = (_id, firstName, lastName, email) => {
  return jwt.sign(
    { _id, firstName, lastName, email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export default generateAuthToken;
