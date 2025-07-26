const db = require("../dbConfig/db");
const asyncHandler = require("express-async-handler");

exports.clientModel = {
  create: asyncHandler(async (clientData) => {
    await db("client").insert(clientData);
    return clientData;
  }),
};
