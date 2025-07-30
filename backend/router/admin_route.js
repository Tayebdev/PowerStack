const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changedAdminPassword,
} = require("../controller/admin_controller");
const {
  createAdminValidator,
  getAdminValidator,
  updateAdminValidator,
  deleteAdminValidator,
  updateAdminPasswordValidator,
} = require("../utils/validator/adminValidator");

const { parseFormDataArrays } = require("../middleware/parseDataMiddleware");

router
  .route("/")
  .post(parseFormDataArrays, createAdminValidator, createAdmin)
  .get(getAllAdmin);

router
  .route("/adminId/:adminId")
  .get(getAdminValidator, getAdminById)
  .put(parseFormDataArrays, updateAdminValidator, updateAdmin)
  .delete(deleteAdminValidator, deleteAdmin);

router.put(
  "/adminPassword/:adminId",
  updateAdminPasswordValidator,
  changedAdminPassword
);

module.exports = router;
