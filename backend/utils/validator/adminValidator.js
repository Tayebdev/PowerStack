const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../../dbConfig/db");
const ErrorAPI = require("../../utils/ErrorAppi");
const { runValidation } = require("../../middleware/validatorMiddleware");
const bcrypt = require("bcryptjs"); // Add this at the top

exports.createAdminValidator = [
  check("storeName")
    .notEmpty()
    .withMessage("Store name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Store name must be 2-50 characters"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(
      asyncHandler(async (value) => {
        const admin = await db("admin").where({ email: value }).first();
        if (admin) {
          throw new ErrorAPI("Email already in use", 400);
        }
        return true;
      })
    ),

  check("phones")
    .notEmpty()
    .withMessage("Phones are required")
    .custom((value) => {
      if (!Array.isArray(value) && typeof value !== "string") {
        throw new Error("Phones must be an array or JSON string");
      }
      return true;
    }),

  check("openHours").notEmpty().withMessage("Open hours are required"),
  check("storeStatus").notEmpty().withMessage("Store status is required"),
  check("mapUrl").notEmpty().withMessage("Map URL is required"),

  check("passwordConfirmation")
    .notEmpty()
    .withMessage("Password Confirmation id required"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password != req.body.passwordConfirmation) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),

  check("whatsapp").optional().isString(),
  check("instagram").optional().isString(),
  check("tiktok").optional().isString(),
  check("facebook").optional().isString(),
  check("role")
    .optional()
    .isIn(["admin", "superadmin"])
    .withMessage("Invalid role"),

  runValidation,
];

exports.getAdminValidator = [
  check("adminId")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isInt({ min: 1 })
    .withMessage("Admin ID must be a positive integer"),

  runValidation,
];

exports.updateAdminValidator = [
  check("adminId")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid admin ID")
    .custom(
      asyncHandler(async (value) => {
        const admin = await db("admin").where({ id: value }).first();
        if (!admin) {
          throw new ErrorAPI("Admin not found", 404);
        }
        return true;
      })
    ),

  check("storeName").optional().isLength({ min: 2, max: 50 }),
  check("email").optional().isEmail(),
  check("phones").optional(),
  check("openHours").optional(),
  check("storeStatus").optional(),
  check("mapUrl").optional(),
  check("password").optional().isLength({ min: 6 }),
  check("whatsapp").optional().isString(),
  check("instagram").optional().isString(),
  check("tiktok").optional().isString(),
  check("facebook").optional().isString(),
  check("role").optional().isIn(["admin", "superadmin"]),

  runValidation,
];

exports.deleteAdminValidator = [
  check("adminId")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid Admin ID")
    .custom(
      asyncHandler(async (value) => {
        const admin = await db("admin").where({ id: value }).first();
        if (!admin) {
          throw new ErrorAPI("Admin not found", 404);
        }
        return true;
      })
    ),

  runValidation,
];

exports.updateAdminPasswordValidator = [
  check("adminId")
    .notEmpty()
    .withMessage("Admin ID is required")
    .isInt({ min: 1 })
    .withMessage("Invalid Admin ID")
    .custom(
      asyncHandler(async (value) => {
        const admin = await db("admin").where({ id: value }).first();
        if (!admin) {
          throw new ErrorAPI("Admin not found", 404);
        }
        return true;
      })
    ),

  check("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("You must enter your confirm password"),

  check("password")
    .notEmpty()
    .withMessage("You must enter new password")
    .custom(async (value, { req }) => {
      // 1) verify password
      const admin = await db("admin").where({ id: req.params.adminId }).first();
      if (!admin) {
        throw new Error("There is no admin for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        admin.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }
      // 2) validate new password
      if (value != req.body.confirmPassword) {
        throw new Error("Password confirmation incorrect");
      }
      return true;
    }),
  runValidation,
];
