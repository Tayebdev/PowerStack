const { productModel } = require("../model/product_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createProduct = createOne(productModel, "Product");
exports.getAllProduct = getAll(productModel, "Product");
exports.getProductById = getOne(productModel, "Product", "productId");
exports.updateProduct = updateOne(productModel, "Product", "productId");
exports.deleteProduct = deleteOne(productModel, "Product", "productId");
