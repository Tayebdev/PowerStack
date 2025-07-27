const express = require("express");
const router = express.Router();
const {
  createClient,
  getAllClient,
  getClientById,
  deleteClient,
  updateClient,
} = require("../controller/client_controller");
const {
  createClientValidator,
  getClientValidator,
  deleteClientValidator,
  updateClientValidator,
} = require("../utils/validator/clientValidator");

router.route("/").post(createClientValidator, createClient).get(getAllClient);

router
  .route("/id/:clientId")
  .get(getClientValidator, getClientById)
  .delete(deleteClientValidator, deleteClient)
  .put(updateClientValidator, updateClient);

module.exports = router;
