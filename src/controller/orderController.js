import thisModel from "../models/OrderModel";

const getAll = async (req, res) => {
  try {
    const result = await thisModel.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
export { getAll };