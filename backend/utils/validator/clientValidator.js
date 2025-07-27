const { runValidation } = require("../../middleware/validatorMiddleware");
const { check } = require("express-validator");
const db = require("../../dbConfig/db");
const ErrorAPI = require("../../utils/ErrorAppi");

exports.createClientValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 3 })
    .withMessage("firstName is too short")
    .isLength({ max: 30 })
    .withMessage("firstName is too long"),

  check("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .isLength({ min: 3 })
    .withMessage("lastName is too short")
    .isLength({ max: 30 })
    .withMessage("lastName is too long"),

  check("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("phone must be exactly 10 digits")
    .matches(/^[0-9]+$/)
    .withMessage("phone must contain only digits"),

  check("wilaya").notEmpty().withMessage("wilaya is required"),

  check("commune").notEmpty().withMessage("commune is required"),

  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 50 })
    .withMessage("email is too long"),

  runValidation,
];
exports.getClientValidator = [
  check("clientId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid user ID format"),
  runValidation,
];

exports.updateClientValidator = [
  check("clientId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid user ID format")
    .custom(async (value) => {
      const client = await db("client").where({ id: value }).first();
      if (!client) {
        throw new ErrorAPI("Client Not found", 404);
      }
      return true;
    }),
  check("firstName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("firstName is too short")
    .isLength({ max: 30 })
    .withMessage("firstName is too long"),

  check("lastName")
    .optional()
    .isLength({ min: 3 })
    .withMessage("lastName is too short")
    .isLength({ max: 30 })
    .withMessage("lastName is too long"),

  check("phone")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("phone must be exactly 10 digits")
    .matches(/^[0-9]+$/)
    .withMessage("phone must contain only digits"),

  check("wilaya")
    .optional()
    .isLength({ min: 3 })
    .withMessage("firstName is too short")
    .isLength({ max: 30 })
    .withMessage("firstName is too long"),

  check("commune")
    .optional()
    .isLength({ min: 3 })
    .withMessage("firstName is too short")
    .isLength({ max: 30 })
    .withMessage("firstName is too long"),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 50 })
    .withMessage("email is too long"),
  runValidation,
];

exports.deleteClientValidator = [
  check("clientId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid user ID format"),
  runValidation,
];
