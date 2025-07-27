const db = require("../dbConfig/db");
const asyncHandler = require("express-async-handler");

exports.clientModel = {
  create: asyncHandler(async (clientData) => {
    await db("client").insert(clientData);
    return clientData;
  }),
  getAll: asyncHandler(async () => {
    return await db("client").select("*");
  }),
  getById: asyncHandler(async (clientId) => {
    return await db("client").select("*").where({ id: clientId });
  }),
  update: asyncHandler(async (clientId, updateClient) => {
    await db("client").where({ id: clientId }).update(updateClient);
    return updateClient;
  }),
  delete: asyncHandler(async (clientId) => {
    return await db("client").where({ id: clientId }).del();
  }),
};
