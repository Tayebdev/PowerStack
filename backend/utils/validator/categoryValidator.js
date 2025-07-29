const { runValidation } = require("../../middleware/validatorMiddleware");
const { check } = require("express-validator");
const db = require("../../dbConfig/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { removeImage } = require("../../middleware/imageMiddleware");
const asyncHandler = require("express-async-handler");

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 30 })
    .withMessage("Name is too long")
    .custom(async (value, { req }) => {
      if (!value || value.length < 3 || value.length > 30) {
        await removeImage(req.file.path);
        throw new ErrorAPI("Name is required", 400);
      }
      return true;
    }),

  check("picture").custom(async (value, { req }) => {
    if (!req.file) {
      throw new ErrorAPI("Picture category is required", 400);
    }
    return true;
  }),

  runValidation,
];

exports.getCategoryValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid Category ID format"),
  runValidation,
];

exports.updateCategoryValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid Category ID format")
    .bail()
    .custom(
      asyncHandler(async (value) => {
        const category = await db("category").where({ id: value }).first();
        if (!category) {
          throw new ErrorAPI("Category not found", 404);
        }
        return true;
      })
    ),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 30 })
    .withMessage("Name is too long")
    .custom(async (value, { req }) => {
      if (!value || value.length < 3 || value.length > 30) {
        throw new ErrorAPI("Name is required", 400);
      }
      return true;
    }),

  check("picture").custom(async (value, { req }) => {
    if (req.file && !req.file.mimetype.startsWith("image/")) {
      await removeImage(req.file.path);
      throw new ErrorAPI("Only image files are allowed", 400);
    }
    return true;
  }),

  runValidation,
];

exports.deleteCategoryValidator = [
  check("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid category ID format"),
  runValidation,
];
