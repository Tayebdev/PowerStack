const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../../dbConfig/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const {runValidation} = require("../../middleware/validatorMiddleware");
const { removeImage } = require("../../middleware/imageMiddleware");


exports.createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 30 })
    .withMessage("Name is too long")
    .custom(
      asyncHandler(async (value, { req }) => {
        if (!value || value.length < 3 || value.length > 30) {
          await removeImage(req.file?.path);
          throw new ErrorAPI("Product name must be between 3 and 30 characters", 400);
        }
        return true;
      })
    ),

  check("picture").custom(async (value, { req }) => {
    if (!req.file) {
      throw new ErrorAPI("Picture product is required", 400);
    }
    return true;
  }),

  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom(
      asyncHandler(async (value, { req }) => {
        if (!value) {
          await removeImage(req.file?.path);
          throw new ErrorAPI("Product price is required", 400);
        }
        return true;
      })
    ),

  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer")
    .custom(
      asyncHandler(async (value, { req }) => {
        if (value < 0) {
          await removeImage(req.file?.path);
          throw new ErrorAPI("Quantity must be a non-negative integer", 400);
        }
        return true;
      })
    ),

  check("flavor")
    .notEmpty()
    .withMessage("Product flavor is required")
    .isArray()
    .withMessage("Flavor must be an array")
    .custom(
      asyncHandler(async (value, { req }) => {
        if (!value || !Array.isArray(value) || value.length === 0) {
          await removeImage(req.file?.path);
          throw new ErrorAPI("Product flavor is required and must be an array", 400);
        }
        return true;
      })
    ),

  check("brandId")
    .notEmpty()
    .withMessage("brandId is required")
    .isInt({ min: 1 })
    .withMessage("Invalid brandId")
    .custom(
      asyncHandler(async (value, { req }) => {
        const brand = await db("brand").where({ id: value }).first();
        if (!brand) {
          await removeImage(req.file?.path);
          throw new ErrorAPI("Brand not found", 404);
        }
        return true;
      })
    ),

  check("categoryId")
    .notEmpty()
    .withMessage("categoryId is required")
    .isInt({ min: 1 })
    .withMessage("Invalid categoryId")
    .custom(
      asyncHandler(async (value, { req }) => {
        const product = await db("category").where({ id: value }).first();
        if (!product) {
          await removeImage(req.file?.path);
          throw new ErrorAPI("category not found", 404);
        }
        return true;
      })
    ),

  runValidation,
];

exports.getProductValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),

  runValidation,
];

exports.updateProductValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer")
    .custom(
      asyncHandler(async (value) => {
        const product = await db("product").where({ id: value }).first();
        if (!product) {
          throw new ErrorAPI("Product not found", 404);
        }
        return true;
      })
    ),

  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name is too short")
    .isLength({ max: 30 })
    .withMessage("Name is too long"),

  check("picture")
    .optional()
    .custom(
      asyncHandler(async (value, { req }) => {
        if (req.file && !req.file.mimetype.startsWith("image/")) {
          await removeImage(req.file?.path);
          throw new ErrorAPI("Only image files are allowed", 400);
        }
        return true;
      })
    ),

  check("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number"),

  check("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  check("flavor")
    .optional()
    .isArray()
    .withMessage("Flavor must be an array"),

  check("brandId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid brandId")
    .custom(
      asyncHandler(async (value) => {
        const brand = await db("brand").where({ id: value }).first();
        if (!brand) {
          throw new ErrorAPI("Brand not found", 404);
        }
        return true;
      })
    ),

  check("productId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid productId")
    .custom(
      asyncHandler(async (value) => {
        const product = await db("product").where({ id: value }).first();
        if (!product) {
          throw new ErrorAPI("Product not found", 404);
        }
        return true;
      })
    ),

  runValidation,
];

exports.deleteProductValidator = [
  check("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid Product ID")
    .custom(
      asyncHandler(async (value) => {
        const product = await db("product").where({ id: value }).first();
        if (!product) {
          throw new ErrorAPI("Product not found", 404);
        }
        return true;
      })
    ),

  runValidation,
];
