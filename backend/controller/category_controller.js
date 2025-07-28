const { categoryModel } = require("../model/category_model");
const ErrorAPI = require("../utils/ErrorAppi");
const asyncHandler = require("express-async-handler");
const { removeImage } = require("../middleware/imageMiddleware");

exports.createCategory = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.picture = req.file.filename;
  }
  const result = await categoryModel.create(req.body);
  if (!result) {
    throw new ErrorAPI("Failed to create category", 401);
  }
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getAllCategory = asyncHandler(async (req, res, next) => {
  const result = await categoryModel.getAll();
  if (!result || result.length === 0) {
    throw new ErrorAPI("No category found", 404);
  }
  res.status(200).json({
    status: "success",
    results: result.length,
    data: result,
  });
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const result = await categoryModel.getById(req.params.categoryId);
  if (!result || result.length === 0) {
    throw new ErrorAPI("No category found", 404);
  }
  res.status(200).json({
    status: "success",
    results: result.length,
    data: result,
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const result = await categoryModel.delete(req.params.categoryId);

  if (!result || result.length === 0) {
    throw new ErrorAPI("No category found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Category is deleted",
  });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.picture = req.file.filename;
  }
  const result = await categoryModel.update(req.params.categoryId, req.body);
  if (!result || result.length === 0) {
    throw new ErrorAPI("Category not updated", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Category is updated",
  });
});
