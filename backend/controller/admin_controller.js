const { adminModel } = require("../model/admin_model");
const asyncHandler = require("express-async-handler");
const ErrorAPI = require("../utils/ErrorAppi");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createAdmin = createOne(adminModel, "Admin");
exports.getAllAdmin = getAll(adminModel, "Admin");
exports.getAdminById = getOne(adminModel, "Admin", "adminId");
exports.updateAdmin = updateOne(adminModel, "Admin", "adminId");
exports.deleteAdmin = deleteOne(adminModel, "Admin", "adminId");
exports.changedAdminPassword = asyncHandler(async (req, res, next) => {
  const result = await adminModel.passwordChange(req.params.adminId,req.body.password );
  if (!result) {
    throw new ErrorAPI("Admin password not changed", 404);
  }
  res.status(200).json({
    status: "success",
    message: "Password is changed",
  });
});
