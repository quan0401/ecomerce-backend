import Product from "../models/ProductModel";

export const getProducts = async (req, res, next) => {
  try {
    const result = await Product.create({ name: "Macbook pro fd" });
    console.log(">>> check result", result);
    res.send("create product");
  } catch (error) {
    console.log(error);
  }
};
