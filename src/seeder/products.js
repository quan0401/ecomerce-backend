const products = [
  {
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Computers",
    count: 7,
    price: 1499,
    rating: 4,
    reviewsNumber: 12,
    attributes: [
      { key: "Processor", value: "Intel Core i7-1165G7" },
      { key: "Storage", value: "512 GB SSD" },
      { key: "RAM", value: "16 GB" },
    ],
    images: [
      {
        url: "/images/lenovo-thinkpad-x1-carbon-black.png",
        alt: "Lenovo ThinkPad X1 Carbon - Black",
      },
      {
        url: "/images/lenovo-thinkpad-x1-carbon-silver.png",
        alt: "Lenovo ThinkPad X1 Carbon - Silver",
      },
    ],
    reviews: [
      /* array of review objectIds */
    ],
  },
  {
    name: "Canon EOS R6",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Cameras",
    count: 4,
    price: 2399,
    rating: 4,
    reviewsNumber: 9,
    attributes: [
      { key: "Sensor", value: "20.1MP full-frame CMOS sensor" },
      { key: "Video", value: "4K UHD up to 60 fps" },
      { key: "ISO", value: "100-102400" },
    ],
    images: [
      {
        url: "/images/canon-eos-r6.png",
        alt: "Canon EOS R6",
      },
    ],
    reviews: [
      /* array of review objectIds */
    ],
  },
  {
    name: "Samsung Galaxy S21",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Phones",
    count: 7,
    price: 699,
    rating: 4,
    reviewsNumber: 12,
    attributes: [
      { key: "Color", value: "Phantom Gray" },
      { key: "Storage", value: "128 GB" },
      { key: "RAM", value: "8 GB" },
    ],
    images: [
      {
        url: "/images/samsung-galaxy-s21-gray.png",
        alt: "Samsung Galaxy S21 - Phantom Gray",
      },
      {
        url: "/images/samsung-galaxy-s21-white.png",
        alt: "Samsung Galaxy S21 - Phantom White",
      },
    ],
    reviews: [
      /* array of review objectIds */
    ],
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Computers",
    count: 8,
    price: 1499,
    rating: 4,
    reviewsNumber: 18,
    attributes: [
      { key: "Processor", value: "10th Gen Intel Core i7-10510U" },
      { key: "Storage", value: "512 GB PCIe SSD" },
      { key: "RAM", value: "16 GB" },
    ],
    images: [
      {
        url: "/images/lenovo-thinkpad-x1-carbon.png",
        alt: "Lenovo ThinkPad X1 Carbon",
      },
    ],
    reviews: [
      /* array of review objectIds */
    ],
  },
  {
    name: "Canon EOS R5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Cameras",
    count: 2,
    price: 3899,
    rating: 2,
    reviewsNumber: 8,
    attributes: [
      { key: "Sensor", value: "45MP full-frame CMOS sensor" },
      {
        key: "Video",
        value: "8K RAW internal video recording up to 29.97 fps",
      },
      { key: "ISO", value: "100-51200 (expandable to 102400)" },
    ],
    images: [
      {
        url: "/images/canon-eos-r5.png",
        alt: "Canon EOS R5",
      },
    ],
    reviews: [
      /* array of review objectIds */
    ],
  },
  {
    name: "Apple AirPods Max",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Headphones",
    count: 3,
    price: 549,
    rating: 1,
    reviewsNumber: 6,
    attributes: [
      { key: "Color", value: "Space Gray" },
      { key: "Battery Life", value: "Up to 20 hours" },
      { key: "Noise Cancellation", value: "Active Noise Cancellation" },
    ],
    images: [
      {
        url: "/images/apple-airpods-max.png",
        alt: "Apple AirPods Max",
      },
    ],
    reviews: [
      /* array of review objectIds */
    ],
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "A classic and powerful stand mixer from KitchenAid",
    brand: "KitchenAid",
    category: "Kitchen",
    count: 10,
    price: 399,
    rating: 4,
    reviewsNumber: 100,
    sales: 30,
    attributes: [
      { key: "Color", value: "Red" },
      { key: "Capacity", value: "5 quarts" },
    ],
    images: [
      {
        url: "https://example.com/kitchenaid-stand-mixer-red.jpg",
        alt: "Red KitchenAid Stand Mixer",
      },
    ],
    reviews: [],
  },
  {
    name: "Cuisinart 14-Cup Food Processor",
    description: "A versatile and powerful food processor from Cuisinart",
    brand: "Cuisinart",
    category: "Kitchen",
    count: 7,
    price: 229,
    rating: 4,
    reviewsNumber: 50,
    sales: 10,
    attributes: [
      { key: "Color", value: "Silver" },
      { key: "Capacity", value: "14 cups" },
    ],
    images: [
      {
        url: "https://example.com/cuisinart-food-processor-silver.jpg",
        alt: "Silver Cuisinart 14-Cup Food Processor",
      },
    ],
    reviews: [],
  },
  {
    name: "Instant Pot Duo Plus",
    description: "A multi-functional pressure cooker from Instant Pot",
    brand: "Instant Pot",
    category: "Kitchen",
    count: 5,
    price: 119,
    rating: 4,
    reviewsNumber: 30,
    sales: 3,
    attributes: [
      { key: "Color", value: "Black" },
      { key: "Capacity", value: "6 quarts" },
    ],
    images: [
      {
        url: "https://example.com/instant-pot-duo-plus-black.jpg",
        alt: "Black Instant Pot Duo Plus",
      },
    ],
    reviews: [],
  },
  {
    name: "Apple iPhone 12",
    description: "The latest iPhone from Apple",
    brand: "Apple",
    category: "Electronics",
    count: 10,
    price: 999,
    rating: 4,
    reviewsNumber: 100,
    sales: 50,
    attributes: [
      { key: "Color", value: "Black" },
      { key: "Storage", value: "64GB" },
    ],
    images: [
      {
        url: "https://example.com/iphone-12-black.jpg",
        alt: "Black iPhone 12",
      },
    ],
    reviews: [],
  },
  {
    name: "Samsung Galaxy S21",
    description: "The latest Galaxy phone from Samsung",
    brand: "Samsung",
    category: "Electronics",
    count: 20,
    price: 899,
    rating: 4,
    reviewsNumber: 50,
    sales: 30,
    attributes: [
      { key: "Color", value: "Gray" },
      { key: "Storage", value: "128GB" },
    ],
    images: [
      {
        url: "https://example.com/galaxy-s21-gray.jpg",
        alt: "Gray Galaxy S21",
      },
    ],
    reviews: [],
  },
  {
    name: "Nike Air Max 270",
    description: "A popular sneaker from Nike",
    brand: "Nike",
    category: "Footwear",
    count: 5,
    price: 150,
    rating: 4,
    reviewsNumber: 200,
    sales: 10,
    attributes: [
      { key: "Size", value: "10" },
      { key: "Color", value: "White" },
    ],
    images: [
      {
        url: "https://example.com/air-max-270-white.jpg",
        alt: "White Air Max 270",
      },
    ],
    reviews: [],
  },

  {
    name: "KitchenAid Stand Mixer",
    description: "A classic and powerful stand mixer from KitchenAid",
    brand: "KitchenAid",
    category: "Kitchen",
    count: 10,
    price: 399,
    rating: 4,
    reviewsNumber: 100,
    sales: 30,
    attributes: [
      { key: "Color", value: "Red" },
      { key: "Capacity", value: "5 quarts" },
    ],
    images: [
      {
        url: "https://example.com/kitchenaid-stand-mixer-red.jpg",
        alt: "Red KitchenAid Stand Mixer",
      },
    ],
    reviews: [],
  },
  {
    name: "Cuisinart 14-Cup Food Processor",
    description: "A versatile and powerful food processor from Cuisinart",
    brand: "Cuisinart",
    category: "Kitchen",
    count: 7,
    price: 229,
    rating: 2,
    reviewsNumber: 50,
    sales: 10,
    attributes: [
      { key: "Color", value: "Silver" },
      { key: "Capacity", value: "14 cups" },
    ],
    images: [
      {
        url: "https://example.com/cuisinart-food-processor-silver.jpg",
        alt: "Silver Cuisinart 14-Cup Food Processor",
      },
    ],
    reviews: [],
  },
  {
    name: "Instant Pot Duo Plus",
    description: "A multi-functional pressure cooker from Instant Pot",
    brand: "Instant Pot",
    category: "Kitchen",
    count: 5,
    price: 119,
    rating: 4,
    reviewsNumber: 30,
    sales: 3,
    attributes: [
      { key: "Color", value: "Black" },
      { key: "Capacity", value: "6 quarts" },
    ],
    images: [
      {
        url: "https://example.com/instant-pot-duo-plus-black.jpg",
        alt: "Black Instant Pot Duo Plus",
      },
    ],
    reviews: [],
  },
  {
    name: "Ikea Malm Bed Frame",
    description: "A simple and modern bed frame from Ikea",
    brand: "Ikea",
    category: "Furniture",
    count: 15,
    price: 199,
    rating: 2,
    reviewsNumber: 30,
    sales: 20,
    attributes: [
      { key: "Color", value: "White" },
      { key: "Size", value: "Queen" },
    ],
    images: [
      {
        url: "https://example.com/ikea-malm-bed-white.jpg",
        alt: "White Ikea Malm Bed Frame",
      },
    ],
    reviews: [],
  },
  {
    name: "West Elm Mid-Century Dresser",
    description: "A classic and stylish dresser from West Elm",
    brand: "West Elm",
    category: "Furniture",
    count: 8,
    price: 799,
    rating: 4,
    reviewsNumber: 50,
    sales: 5,
    attributes: [
      { key: "Color", value: "Acorn" },
      { key: "Material", value: "Wood" },
    ],
    images: [
      {
        url: "https://example.com/west-elm-dresser-acorn.jpg",
        alt: "Acorn West Elm Mid-Century Dresser",
      },
    ],
    reviews: [],
  },
  {
    name: "CB2 Velvet Sofa",
    description: "A luxurious and comfortable sofa from CB2",
    brand: "CB2",
    category: "Furniture",
    count: 3,
    price: 1999,
    rating: 2,
    reviewsNumber: 20,
    sales: 1,
    attributes: [
      { key: "Color", value: "Green" },
      { key: "Material", value: "Velvet" },
    ],
    images: [
      {
        url: "https://example.com/cb2-velvet-sofa-green.jpg",
        alt: "Green CB2 Velvet Sofa",
      },
    ],
    reviews: [],
  },
  {
    name: "Dyson Cyclone V10 Absolute",
    description: "A powerful and versatile cordless vacuum from Dyson",
    brand: "Dyson",
    category: "Household",
    count: 12,
    price: 499,
    rating: 1,
    reviewsNumber: 200,
    sales: 50,
    attributes: [
      { key: "Color", value: "Iron" },
      { key: "Weight", value: "6.68 lbs" },
    ],
    images: [
      {
        url: "https://example.com/dyson-cyclone-v10-absolute.jpg",
        alt: "Dyson Cyclone V10 Absolute",
      },
    ],
    reviews: [],
  },
  {
    name: "Roomba i3+ Robot Vacuum",
    description: "A smart and efficient robot vacuum from Roomba",
    brand: "Roomba",
    category: "Household",
    count: 8,
    price: 599,
    rating: 2,
    reviewsNumber: 100,
    sales: 20,
    attributes: [
      { key: "Color", value: "Black" },
      { key: "Type", value: "Robot Vacuum" },
    ],
    images: [
      {
        url: "https://example.com/roomba-i3-plus.jpg",
        alt: "Roomba i3+ Robot Vacuum",
      },
    ],
    reviews: [],
  },
  {
    name: "Nest Learning Thermostat",
    description: "A smart and energy-saving thermostat from Nest",
    brand: "Nest",
    category: "Household",
    count: 4,
    price: 249,
    rating: 4,
    reviewsNumber: 80,
    sales: 5,
    attributes: [
      { key: "Color", value: "Stainless Steel" },
      { key: "Compatibility", value: "Works with Alexa and Google Assistant" },
    ],
    images: [
      {
        url: "https://example.com/nest-learning-thermostat.jpg",
        alt: "Nest Learning Thermostat",
      },
    ],
    reviews: [],
  },
];

export default products;
