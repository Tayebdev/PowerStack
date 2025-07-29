const express = require("express");
const router = express.Router();
const { uploadImage } = require("../middleware/imageMiddleware");
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product_controller");
const {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validator/productValidator");

const {parseFormDataArrays}=require('../middleware/parseDataMiddleware')

router
  .route("/")
  .post(
    uploadImage("product").single("picture"),
    parseFormDataArrays,
    createProductValidator,
    createProduct
  )
  .get(getAllProduct);

router
  .route("/productId/:productId")
  .get(getProductValidator, getProductById)
  .put(
    uploadImage("product").single("picture"),
    parseFormDataArrays,
    updateProductValidator,
    updateProduct
  )
  .delete(deleteProductValidator, deleteProduct);

module.exports = router;
