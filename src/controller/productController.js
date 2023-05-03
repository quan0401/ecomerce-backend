import Product from "../models/ProductModel";
import recordsPerPage from "../config/pagination";

export const getAllController = async (req, res, next) => {
  try {
    // They are the same
    // const result = await Product.find().sort({ name: 'asc' });

    // paignation
    const pageNum = Number(req.query.pageNum) || 1;

    // sort
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      const splitSortOption = sortOption.split("_");
      sort = { [splitSortOption[0]]: +splitSortOption[1] };
    }

    // Filter
    // Price filter
    let query = {};
    let isFilter = false;
    let priceQuery = {};
    if (req.query.price) {
      isFilter = true;
      priceQuery = { price: { $lt: +req.query.price } };
    }
    // Rating filter
    let ratingList = [];
    let ratingQuery = {};
    if (req.query.rating) {
      isFilter = true;
      // split ["1", " 2", " 3"] to array of number
      ratingList = req.query.rating
        .split(",")
        .map((each) => Number(each.trim()));
      ratingQuery = { rating: { $in: ratingList } };
    }
    // Category filter
    let categoryQuery = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      isFilter = true;
      const a = categoryName.replaceAll(",", "/");
      const regEx = new RegExp("^" + a);
      categoryQuery = { category: regEx };
    }

    if (isFilter) query = { $and: [priceQuery, ratingQuery, categoryQuery] };

    const totalProducts = await Product.count(query);
    const products = await Product.find(query)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.status(200).json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
    });
  } catch (error) {
    next(error);
  }
};
