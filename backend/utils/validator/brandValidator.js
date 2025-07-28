const { runValidation } = require("../../middleware/validatorMiddleware");
const { check } = require("express-validator");
const ErrorAPI = require("../../utils/ErrorAppi");
const { removeImage } = require("../../middleware/imageMiddleware");
const db = require("../../dbConfig/db");
const asyncHandler = require("express-async-handler");

exports.createBrandValidator = [
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
      throw new ErrorAPI("Picture brand is required", 400);
    }
    return true;
  }),

  runValidation,
];

exports.getBrandValidator = [
  check("brandId")
    .notEmpty()
    .withMessage("Brand ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid Brand ID format"),
  runValidation,
];

exports.updateBrandValidator = [
  check("brandId")
    .notEmpty()
    .withMessage("Brand ID is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid Brand ID format")
    .bail()
    .custom(
      asyncHandler(async (value) => {
        const brand = await db("brand").where({ id: value }).first();
        if (!brand) {
          throw new ErrorAPI("Brand not found", 404);
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
        await removeImage(req.file.path);
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

exports.deleteBrandValidator = [
  check("brandId")
    .notEmpty()
    .withMessage("Brand ID is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Invalid Brand ID format")
    .bail()
    .custom(
      asyncHandler(async (value) => {
        const brand = await db("brand").where({ id: value }).first();
        if (!brand) {
          throw new ErrorAPI("Brand not found", 404);
        }
        return true;
      })
    ),
  runValidation,
];
