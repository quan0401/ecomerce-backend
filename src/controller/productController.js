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
    // Category filter for params
    let categoryQuery = {};
    const categoryName = req.params.categoryName || "";

    if (categoryName) {
      isFilter = true;
      const a = categoryName.replaceAll(",", "/");
      const regEx = new RegExp("^" + a);
      categoryQuery = { category: regEx };
    }

    // Category filter for query multiple
    const category = req.query.category || "";
    if (category) {
      isFilter = true;
      const a = category.split(",").map((item) => new RegExp("^" + item));
      categoryQuery = { category: { $in: a } };
    }

    // Attributes filter
    const rawAttrs = req.query.attrs || "";
    let attributesQuery = [];
    if (rawAttrs) {
      isFilter = true;
      attributesQuery = rawAttrs.split(",").reduce((acc, item) => {
        const splitKeyAndValues = item.split("-");
        const key = splitKeyAndValues[0];
        splitKeyAndValues.shift();
        const query = {
          attributes: {
            $elemMatch: { key, value: { $in: splitKeyAndValues } },
          },
        };
        acc.push(query);
        return acc;
      }, []);
    }

    console.log(...attributesQuery);

    if (isFilter)
      query = {
        $and: [
          priceQuery,
          ratingQuery,
          categoryQuery,
          ...attributesQuery,
          // {
          //   attributes: {
          //     $elemMatch: {
          //       key: "Battery Life",
          //       value: { $in: ["Up to 20 hours"] },
          //     },
          //   },
          // },
        ],
      };

    const totalProducts = await Product.count(query);
    const products = await Product.find(query)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);

    res.status(200).json({
      products,
      pageNum,
      paginationLinksNumber: Math.ceil(totalProducts / recordsPerPage),
      attributesQuery,
    });
  } catch (error) {
    next(error);
  }
};
