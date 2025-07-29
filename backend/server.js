const db = require("./dbConfig/db");
const express = require("express");
require("dotenv").config();
const ErrorAPI = require("./utils/ErrorAppi");
const GlobalError = require("./middleware/globalError");
const morgan = require("morgan");
const path = require("path");

//Routers
const clientRoute = require("./router/client_route");
const categoryRoute = require("./router/category_route");
const brandRoute = require("./router/brand_route");
const productRoute=require('./router/product_route')



const app = express();

app.use("/upload", express.static(path.join(__dirname, "Uploads")));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`✅ mode:${process.env.NODE_ENV}`);
}

//Routes
app.use("/api/v1/client", clientRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/product", productRoute);


app.use((req, res, next) => {
  next(new ErrorAPI(`Can't find ${req.originalUrl} on the server`, 400));
});

app.use(GlobalError);

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
