import express from "express";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res, next) => {
    try {
      res.send("testingklagfkjasdk;fj;kladsjfl");
    } catch (error) {
      next(error);
      console.log(error);
    }
  });

  return app.use("/api/products", router);
};

export default initApiRoutes;
