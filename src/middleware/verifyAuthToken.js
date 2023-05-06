import jwt from "jsonwebtoken";
require("dotenv").config();
// var decoded = jwt.verify(token, "shhhhh");

export const verifyIsLoggedIn = (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    if (!access_token)
      res.status(403).send("Token is required for authentication");

    try {
      const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized. Invalid token.");
    }
  } catch (error) {
    next(error);
  }
};

export const verifyAdmin = (req, res, next) => {
  try {
    if (req?.user?.isAdmin) next();
    else res.status(401).send("Unauthorized. Admin required");
  } catch (error) {
    next(error);
  }
};
