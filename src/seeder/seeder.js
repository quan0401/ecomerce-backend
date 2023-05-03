// const connectDB = require("../config/db");
import connectDB from "../config/db";

// Seeder for Category
import categories from "./categories";
import Category from "../models/CategoryModel";

// Seeder for Product
import Product from "../models/ProductModel";
import products from "./products";

// Seeder for Review
import Review from "../models/ReviewModel";
import reviews from "./reviews";

// Seeder for User
import User from "../models/UserModel";
import users from "./users";

// Seeder for order
import Order from "../models/OrderModel";
import orders from "./orders";

const importData = async () => {
  connectDB();
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);

    await Review.deleteMany({});
    const result = await Review.insertMany(reviews);

    products.forEach((product) => {
      result.forEach((review) => {
        product.reviews.push(review._id);
      });
    });
    await Product.deleteMany({});
    await Product.insertMany(products);

    await User.deleteMany({});
    await User.insertMany(users);

    await Order.deleteMany({});
    await Order.insertMany(orders);

    console.log("Seeder data");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default importData;
