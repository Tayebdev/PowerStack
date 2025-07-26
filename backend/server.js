const db = require("./dbConfig/db");
const express = require("express");
require("dotenv").config();
const ErrorAPI = require("./utils/ErrorAppi");
const GlobalError = require("./middleware/globalError");
const morgan = require("morgan");


//Routers
const clientRoute=require('./router/client_route')

const app = express();
app.use(express.json({ limit: "20kb" }));
if ((process.env.NODE_ENV === "development")) {
  app.use(morgan("dev"));
  console.log(`✅ mode:${process.env.NODE_ENV}`);
}


//Routes
app.use("/api/v1/client",clientRoute)

app.use((req, res, next) => {
  next(new ErrorAPI(`Can't find ${req.originalUrl} on the server`, 400));
});

app.use(GlobalError);

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
