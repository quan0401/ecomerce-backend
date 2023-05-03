import Product from "../models/ProductModel";
import recordsPerPage from "../config/pagination";

export const getAll = async (req, res, next) => {
  try {
    // They are the same
    // const result = await Product.find().sort({ name: 'asc' });

    let query = {};

    // Filter
    const priceQuery = { price: { $lt: +req.query.price } };

    const ratingList = req.query.rating
      .split(",")
      .map((each) => Number(each.trim()));

    const ratingQuery = { rating: { $in: ratingList } };

    query = { $and: [priceQuery, ratingQuery] };

    // paignation
    const pageNum = Number(req.query.pageNum) || 1;

    // sort
    let sort = {};
    const sortOption = req.query.sort || "";
    if (sortOption) {
      const splitSortOption = sortOption.split("_");
      sort = { [splitSortOption[0]]: +splitSortOption[1] };
    }

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
