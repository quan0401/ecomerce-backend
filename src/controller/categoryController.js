import thisModel from "../models/CategoryModel";

const getAllController = async (req, res) => {
  try {
    const result = await thisModel.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
export { getAllController };
