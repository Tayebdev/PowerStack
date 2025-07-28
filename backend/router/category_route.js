const express = require("express");
const router = express.Router();
const { uploadImage } = require("../middleware/imageMiddleware");
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/category_controller");
const {
  createCategoryValidator,
  getCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validator/categoryValidator");

router
  .route("/")
  .post(
    uploadImage("category").single("picture"),
    createCategoryValidator,
    createCategory
  )
  .get(getAllCategory);

router
  .route("/categoryId/:categoryId")
  .get(getCategoryValidator, getCategoryById)
  .put(
    uploadImage("category").single("picture"),
    updateCategoryValidator,
    updateCategory
  )
  .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
