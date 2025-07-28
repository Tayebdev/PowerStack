const express = require("express");
const router = express.Router();
const { uploadImage } = require("../middleware/imageMiddleware");
const {
  createBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controller/brand_controller");
const {
  createBrandValidator,
  getBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require("../utils/validator/brandValidator");

router
  .route("/")
  .post(
    uploadImage("brand").single("picture"),
    createBrandValidator,
    createBrand
  )
  .get(getAllBrand);

router
  .route("/brandId/:brandId")
  .get(getBrandValidator, getBrandById)
  .put(
    uploadImage("brand").single("picture"),
    updateBrandValidator,
    updateBrand
  )
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
