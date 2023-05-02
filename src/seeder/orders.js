import { ObjectId } from "mongodb";

const orders = [
  {
    user: new ObjectId(),
    orderTotal: { itemsCount: 3, cartSubTotal: 249.99 },
    cartItems: [
      {
        name: "Product A",
        price: 99.99,
        image: { path: "https://example.com/productA.jpg" },
        quantity: 1,
        count: 1,
      },
      {
        name: "Product B",
        price: 75.0,
        image: { path: "https://example.com/productB.jpg" },
        quantity: 2,
        count: 2,
      },
    ],
    transactionResult: {
      status: "success",
      createTime: "2023-04-30T12:00:00Z",
      amount: 249.99,
    },
    isPaid: true,
    paidAt: "2023-04-30T12:01:00Z",
    isDelivered: false,
  },
  {
    user: new ObjectId(),
    orderTotal: { itemsCount: 1, cartSubTotal: 149.99 },
    cartItems: [
      {
        name: "Product C",
        price: 149.99,
        image: { path: "https://example.com/productC.jpg" },
        quantity: 1,
        count: 1,
      },
    ],
    transactionResult: {
      status: "success",
      createTime: "2023-04-29T15:00:00Z",
      amount: 149.99,
    },
    isPaid: true,
    paidAt: "2023-04-29T15:01:00Z",
    isDelivered: false,
  },
  {
    user: new ObjectId(),
    orderTotal: { itemsCount: 2, cartSubTotal: 99.98 },
    cartItems: [
      {
        name: "Product D",
        price: 49.99,
        image: { path: "https://example.com/productD.jpg" },
        quantity: 1,
        count: 1,
      },
      {
        name: "Product E",
        price: 49.99,
        image: { path: "https://example.com/productE.jpg" },
        quantity: 1,
        count: 1,
      },
    ],
    transactionResult: {
      status: "failed",
      createTime: "2023-04-28T10:00:00Z",
      amount: 0,
    },
    isPaid: false,
    paidAt: null,
    isDelivered: false,
  },
  {
    user: new ObjectId(),
    orderTotal: { itemsCount: 1, cartSubTotal: 399.99 },
    cartItems: [
      {
        name: "Product F",
        price: 399.99,
        image: { path: "https://example.com/productF.jpg" },
        quantity: 1,
        count: 1,
      },
    ],
    transactionResult: {
      status: "success",
      createTime: "2023-04-27T08:00:00Z",
      amount: 399.99,
    },
    isPaid: true,
    paidAt: "2023-04-30T08:01:00Z",
    isDelivered: true,
    deliverAt: "2023-04-30T12:00:00Z",
  },
  {
    user: new ObjectId(),
    orderTotal: { itemsCount: 4, cartSubTotal: 179.96 },
    cartItems: [
      {
        name: "Product G",
        price: 29.99,
        image: { path: "https://example.com/productG.jpg" },
        quantity: 1,
        count: 1,
      },
      {
        name: "Product H",
        price: 39.99,
        image: { path: "https://example.com/productH.jpg" },
        quantity: 2,
        count: 2,
      },
      {
        name: "Product I",
        price: 34.99,
        image: { path: "https://example.com/productI.jpg" },
        quantity: 1,
        count: 1,
      },
    ],
    transactionResult: {
      status: "success",
      createTime: "2023-04-26T17:00:00Z",
      amount: 179.96,
    },
    isPaid: true,
    paidAt: "2023-04-26T17:01:00Z",
    isDelivered: false,
  },
];
export default orders;
