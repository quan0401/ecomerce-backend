import thisModel from "../models/ProductModel";

export const getProducts = async (req, res, next) => {
  try {
    const result = await thisModel.find();

    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
