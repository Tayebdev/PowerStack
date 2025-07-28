const { categoryModel } = require("../model/category_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createCategory = createOne(categoryModel, "Category");
exports.getAllCategory = getAll(categoryModel, "Category");
exports.getCategoryById = getOne(categoryModel, "Category", "categoryId");
exports.updateCategory = updateOne(categoryModel, "Category", "categoryId");
exports.deleteCategory = deleteOne(categoryModel, "Category", "categoryId");
