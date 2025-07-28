const { brandModel } = require("../model/brand_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createBrand = createOne(brandModel, "Brand");
exports.getAllBrand = getAll(brandModel, "Brand");
exports.getBrandById = getOne(brandModel, "Brand", "brandId");
exports.updateBrand = updateOne(brandModel, "Brand", "brandId");
exports.deleteBrand = deleteOne(brandModel, "Brand", "brandId");
