const db = require("../dbConfig/db");
const asyncHandler = require("express-async-handler");
const { removeImage } = require("../middleware/imageMiddleware");
const path = require("path");
const uploadPath = path.join(__dirname, "../Uploads/brand");

exports.brandModel = {
  create: asyncHandler(async (brandData) => {
    await db("brand").insert(brandData);
    return brandData;
  }),
  getAll: asyncHandler(async () => {
    return await db("brand").select("*");
  }),
  getById: asyncHandler(async (brandId) => {
    return await db("brand").select("*").where({ id: brandId });
  }),
  update: asyncHandler(async (brandId, updateBrand) => {
    const result = await db("brand").select("*").where({ id: brandId });
    if (!result || result.length === 0) {
      return null;
    }
    if (updateBrand.picture && result[0].picture) {
      await removeImage(`${uploadPath}/${result[0].picture}`);
    }
    await db("brand").where({ id: brandId }).update(updateBrand);
    return result;
  }),
  delete: asyncHandler(async (brandId) => {
    const result = await db("brand").where({ id: brandId });
    if (!result || result.length === 0) {
      return null;
    }
    await removeImage(`${uploadPath}/${result[0].picture}`);
    await db("brand").where({ id: brandId }).del();
    return result;
  }),
};
