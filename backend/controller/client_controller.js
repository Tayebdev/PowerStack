const { clientModel } = require("../model/client_model");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./factoryHandler");

exports.createClient = createOne(clientModel, "Client");
exports.getAllClient = getAll(clientModel, "Client");
exports.getClientById = getOne(clientModel, "Client", "clientId");
exports.updateClient = updateOne(clientModel, "Client", "clientId");
exports.deleteClient = deleteOne(clientModel, "Client", "clientId");
