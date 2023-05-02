import { ObjectId } from "mongodb";

const reviews = [
  {
    comment: "Amazing product, worth every penny!",
    rating: 5,
    user: {
      _id: new ObjectId(),
      name: "Alice Johnson",
    },
  },
  {
    comment: "This product is just okay, nothing special.",
    rating: 3,
    user: {
      _id: new ObjectId(),
      name: "John Smith",
    },
  },
  {
    comment:
      "Really disappointed with this product, wouldn't recommend it to anyone.",
    rating: 1,
    user: {
      _id: new ObjectId(),
      name: "Sarah Lee",
    },
  },
  {
    comment: "Great product, very happy with my purchase.",
    rating: 4,
    user: {
      _id: new ObjectId(),
      name: "David Kim",
    },
  },
  {
    comment: "I had high hopes for this product, but it fell short.",
    rating: 2,
    user: {
      _id: new ObjectId(),
      name: "Jessica Lee",
    },
  },
];
export default reviews;
