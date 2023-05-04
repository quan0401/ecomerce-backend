import Product from "../models/ProductModel";
import recordsPerPage from "../config/pagination";

export const getProductsController = async (req, res, next) => {
  try {
    // They are the same
    // const result = await Product.find().sort({ name: 'asc' });

    // paignation
    const pageNum = Number(req.query.pageNum) || 1;

    // sort
    let sort = {};
    let select = {};
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
    // Search query through search box
    const searchData = req.params.searchQuery;
    let searchQuery = {};
    if (searchData) {
      isFilter = true;
      // searchQuery = { $text: { $search: '"' + searchData + '"' } };
      searchQuery = { $text: { $search: searchData } };

      select.score = { $meta: "textScore" };
      sort = { score: { $meta: "textScore" } };
    }

    if (isFilter)
      query = {
        $and: [
          priceQuery,
          ratingQuery,
          categoryQuery,
          ...attributesQuery,
          searchQuery,
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
      .select(select)
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

export const getProductByIdController = async (req, res, next) => {
  try {
    const result = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getBestsellerController = async (req, res, next) => {
  try {
    // aggregate exampler book 100$, book 50$, Camera 100$, Camera 40$
    // const products = await Product.aggregate([
    //   { $sort: { category: 1, sales: -1 } },
    //   {
    //     $group: { _id: "$category", doc_with_max_sale: { $first: "$$ROOT" } },
    //   },
    //   { $replaceWith: "$doc_with_max_sale" },
    //   { $match: { sales: { $gt: 0 } } },
    //   {
    //     $project: {
    //       sales: 1,
    //       _id: 1,
    //       name: 1,
    //       images: 1,
    //       category: 1,
    //       description: 1,
    //     },
    //   },
    //   { $limit: 3 },
    // ]);

    const products = await Product.aggregate([
      { $sort: { category: 1, sales: -1 } },
      { $group: { _id: "$category", doc_with_max_sale: { $first: "$$ROOT" } } },
      { $replaceWith: "$doc_with_max_sale" },
      { $match: { sales: { $gt: 0 } } },
      {
        $project: {
          sales: 1,
          _id: 1,
          name: 1,
          images: 1,
          category: 1,
          description: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const adminGetProdctsController = async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ category: 1 })
      .select("name price category")
      .orFail();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

export const adminDeleteProductController = async (req, res, next) => {
  try {
    const productId = req.params.id || "";
    if (!productId) res.status(400).find("Id of product is required");

    const product = await Product.findById(productId).orFail();
    const result = await product.deleteOne();
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
};

export const adminCreateProductController = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      count,
      price,
      attributesTable,
      ...values
    } = req.body;

    const result = await Product.create({
      name,
      description,
      category,
      count,
      price,
      attributes: attributesTable,
      ...values,
    });

    const result1 = await result.save();

    res.status(200).send(result1);
  } catch (error) {
    next(error);
  }
};

export const adminUpdateProductController = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = req.body;
    console.log({ productId, product });
    if (!productId || !product)
      return res.status(400).send("Delete unsuccessfully");

    const productFound = await Product.findById(productId).orFail();

    productFound.name = product.name || productFound.name;
    productFound.description = product.description || productFound.description;
    productFound.category = product.category || productFound.category;
    productFound.count = product.count || productFound.count;
    productFound.price = product.price || productFound.price;
    productFound.sales = product.sales || productFound.sales;
    productFound.attributes =
      product.attributesTable || productFound.attributes;
    const result = await productFound.save();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const adminDeleteAllController = async (req, res, next) => {
  try {
    const name = req.params.name;

    const result = await Product.deleteMany({
      $text: { $search: name },
    }).orFail();

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
