import Product from "../models/ProductModel";

import recordsPerPage from "../config/pagination";

import imageValidate from "../utils/validateImage";

import path from "path";

import { v4 as uuidv4 } from "uuid";

import fs from "fs";

export const getProducts = async (req, res, next) => {
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
      // price_-1, name_1
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
    const rawAttrs = req.query.attributes || "";

    let attributesQuery = [];

    if (rawAttrs) {
      isFilter = true;
      // a-b-c,d-e-f

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
      // console.log(attributesQuery[0].attributes["$elemMatch"].value);
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

export const getProductById = async (req, res, next) => {
  try {
    const result = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getBestseller = async (req, res, next) => {
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

export const adminGetProdcts = async (req, res, next) => {
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

export const adminDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id || "";

    if (!productId) res.status(400).find("Id of product is required");

    const product = await Product.findById(productId).orFail();

    const result = await product.deleteOne();

    res.status(200).send({ EC: 0, EM: "Product has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const adminCreateProduct = async (req, res, next) => {
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
      count: +count,
      price: +price,
      attributes: attributesTable,
      ...values,
    });

    const result1 = await result.save();

    res
      .status(200)
      .send({ newProduct: result1, EM: "Product is created successfully" });
  } catch (error) {
    next(error);
  }
};

export const adminUpdateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = req.body;

    if (!productId || !product)
      return res.status(400).send("Update unsuccessfully");

    const productFound = await Product.findById(productId).orFail();

    productFound.name = product.name || productFound.name;

    productFound.description = product.description || productFound.description;

    productFound.category = product.category || productFound.category;

    productFound.count = +product.count || +productFound.count;

    productFound.price = +product.price || +productFound.price;

    productFound.sales = +product.sales || +productFound.sales;

    productFound.attributes =
      product.attributesTable || productFound.attributes;

    const result = await productFound.save();

    res.status(200).send({ EM: "Product updated", result });
  } catch (error) {
    next(error);
  }
};

export const adminDeleteAll = async (req, res, next) => {
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

export const adminUploadFile = async (req, res, next) => {
  if (req.query.cloudinary === "true") {
    try {
      const product = await Product.findById(req.query.productId).orFail();

      product.images.push({ url: req.body.imageUrl });

      const result = await product.save();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
    return;
  }
  try {
    const images = req.files?.images;

    const productId = req.query.productId;

    if (!images) res.status(500).send("No file was uploaded");

    const checkImageType = imageValidate(images);

    if (checkImageType.error) {
      res.status(400).send({ error: checkImageType.error });
    }

    let imagesList = [];

    if (Array.isArray(images)) {
      imagesList = images;
    } else imagesList.push(images);

    if (!productId) res.status(400).send("Need to have productId");

    const product = await Product.findById(productId);

    const uploadDirectory = path.resolve(
      __dirname,
      "../../../ecomerce-front-end/public/images/products"
    );

    imagesList.forEach((img) => {
      // /Users/quankento/Documents/fullstack/ecomerce/ecomerce-front-end/public/images/products/5cc72f32-cbcd-49f6-9351-f3bfcf0349b3jpg

      const fileName = uuidv4() + "." + img.name.split(".").pop();

      const uploadPath = uploadDirectory + "/" + fileName;

      product.images.push({ url: "/images/products/" + fileName });

      img.mv(uploadPath, function (error) {
        if (error) res.status(500).send(error);
      });
    });

    // const result = product.images.map((img) => {
    //   if (img.url.startsWith("/Users")) return img;

    //   else return null;

    // });

    // result.splice(0, 2);

    // const result1 = result.map((item) => {
    //   return item.url;

    // });

    // const test = await Product.updateOne(
    //   { _id: productId },
    //   { $pull: { images: { url: { $in: result1 } } } }
    // );

    // console.log(test);

    // console.log(result);

    await product.save();

    res.status(200).send("Image uploaded");
  } catch (error) {
    next(error);
  }
};

export const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath);
  const productId = req.params.productId || "";
  if (req.query.cloudinary === "true") {
    try {
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        { $pull: { images: { url: imagePath } } }
      ).orFail();
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
    return;
  }

  try {
    if (!productId || !imagePath)
      res.status(400).send("Need product id and imagePath to delete");

    // Find image path name
    const finalPath =
      path.resolve(__dirname, "../../../ecomerce-front-end/public") + imagePath;

    // Delete Image url
    let result = {};

    result = await Product.findOneAndUpdate(
      { _id: productId },
      {
        $pull: {
          images: {
            url: imagePath,
          },
        },
      },
      { new: true }
    ).orFail();

    // Delete images file in the front end
    fs.unlink(finalPath, function (error) {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }
    });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
