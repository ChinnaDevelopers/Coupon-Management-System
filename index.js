require("express-async-errors");
require("dotenv").config();
require("./config")();
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const errorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).render("home");
});

// Importing routes
const userRoutes = require("./routes/user.routes");
const couponRoutes = require("./routes/coupon.routes");
const apiRoutes = require("./routes/api.routes");

app.use("/api/user", userRoutes);
app.use("/api/coupon", couponRoutes);

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page not found",
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
