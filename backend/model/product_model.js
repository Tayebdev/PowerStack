const db = require("../dbConfig/db");
const asyncHandler = require("express-async-handler");
const { removeImage } = require("../middleware/imageMiddleware");
const path = require("path");
const uploadPath = path.join(__dirname, "../Uploads/product");

exports.productModel = {
  create: asyncHandler(async (productData) => {
    if (Array.isArray(productData.flavor)) {
      productData.flavor = JSON.stringify(productData.flavor);
    }
    await db("product").insert(productData);
    return productData;
  }),
  getAll: asyncHandler(async () => {
    const result = await db("product").select("*");
    result.forEach((product) => {
      if (product.flavor) {
        try {
          product.flavor = JSON.parse(product.flavor);
        } catch (e) {
          product.flavor = [];
        }
      }
    });
    return result;
  }),
  getById: asyncHandler(async (productId) => {
    const result = await db("product").select("*").where({ id: productId });
    result.forEach((product) => {
      if (product.flavor) {
        try {
          product.flavor = JSON.parse(product.flavor);
        } catch (e) {
          product.flavor = [];
        }
      }
    });
    return result;
  }),
  update: asyncHandler(async (productId, updateProduct) => {
    const result = await db("product").select("*").where({ id: productId });
    if (!result || result.length === 0) {
      return null;
    }
    if (Array.isArray(updateProduct.flavor)) {
      updateProduct.flavor = JSON.stringify(updateProduct.flavor);
    }
    if (updateProduct.picture && result[0].picture) {
      await removeImage(`${uploadPath}/${result[0].picture}`);
    }
    await db("product").where({ id: productId }).update(updateProduct);
    return result;
  }),
  delete: asyncHandler(async (productId) => {
    const result = await db("product").where({ id: productId });
    if (!result || result.length === 0) {
      return null;
    }
    await removeImage(`${uploadPath}/${result[0].picture}`);
    await db("product").where({ id: productId }).del();
    return result;
  }),
};
