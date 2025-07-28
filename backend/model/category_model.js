const db = require("../dbConfig/db");
const asyncHandler = require("express-async-handler");
const { removeImage } = require("../middleware/imageMiddleware");
const path = require("path");
const uploadPath = path.join(__dirname, "../Uploads/category");

exports.categoryModel = {
  create: asyncHandler(async (categoryData) => {
    await db("category").insert(categoryData);
    return categoryData;
  }),
  getAll: asyncHandler(async () => {
    return await db("category").select("*");
  }),
  getById: asyncHandler(async (categoryId) => {
    return await db("category").select("*").where({ id: categoryId });
  }),
  update: asyncHandler(async (categoryId, updateCategory) => {
    const result = await db("category").select("*").where({ id: categoryId });
    await removeImage(`${uploadPath}/${result[0].picture}`);
    return await db("category")
      .where({ id: categoryId })
      .update(updateCategory);
  }),
  delete: asyncHandler(async (categoryId) => {
    const result = await db("category").where({ id: categoryId });
    await removeImage(`${uploadPath}/${result[0].picture}`);
    return await db("category").where({ id: categoryId }).del();
  }),
};
