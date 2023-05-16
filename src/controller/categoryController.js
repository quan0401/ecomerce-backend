import Category from "../models/CategoryModel";

export const getAllController = async (req, res, next) => {
  try {
    // orFail() when there is no category error will be thrown
    const result = await Category.find().sort({ name: "asc" }).orFail();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const newCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) res.status(400).json("Category input is required");

    const isExisted = await Category.findOne({ name });

    if (isExisted) {
      res.status(400).json("This category is existed");
    }
    const isCreated = await Category.create({ name });

    res.status(201).json({ isCreated });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    const { category } = req.params;

    if (!category) res.status(400).send("Category is required to delete");

    const isExisted = await Category.findOne({
      name: decodeURIComponent(category),
    }).orFail();

    isExisted.deleteOne();

    if (!isExisted) res.status(400);
  } catch (error) {
    next(error);
  }
};

export const saveAttributeController = async (req, res, next) => {
  try {
    const { key, value, categoryChosen } = req.body;
    console.log(">>> checking", categoryChosen);

    // Computers/laptop/Dell
    const category = categoryChosen.split("/")[0];

    if (!key || !value || !categoryChosen)
      res.status(400).send("All inputs are required to create new attribute!");

    const categoryExists = await Category.findOne({ name: category }).orFail();

    let attrNotExist = true;

    categoryExists.attributes.forEach((attr, index) => {
      // Check if the key is existed, if yes set the value and handle the duplicate
      if (attr.key === key) {
        attrNotExist = false;

        attr.value = [...new Set([...attr.value, value])];
      }
    });

    if (attrNotExist) categoryExists.attributes.push({ key, value });

    await categoryExists.save();

    const updatedCategory = await Category.find().sort({ name: "asc" });

    res.status(201).json({ updatedCategory });
  } catch (error) {
    next(error);
  }
};
