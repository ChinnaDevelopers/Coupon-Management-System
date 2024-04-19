require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const errorHandler = require("./utils/errorHandler");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).render("home");
});

// Importing routes
const userRoutes = require("./routes/user.routes");

app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

const PORT = process.env.PORT || 3000;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
