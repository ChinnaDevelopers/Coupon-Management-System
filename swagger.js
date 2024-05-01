const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    // name of your api
    title: "CouponAPI",
    description: "A simple Coupon Management System",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger.json";
// assuming your routes are located in app.js
const routes = [
  "./routes/user.routes.js",
  "./routes/coupon.routes.js",
  "./routes/api.routes.js",
];
swaggerAutogen(outputFile, routes, doc);
