const ErrorAPI = require("../utils/ErrorAppi");
const { clientModel } = require("../model/client_model");
const asyncHandler = require("express-async-handler");

exports.createClient = asyncHandler(async (req, res, next) => {
  const result = await clientModel.create(req.body);
  if (!result) {
    throw new ErrorAPI("Failed to create client", 401);
  }
  res.status(201).json({
    status: "success",
    data: result,
  });
});

exports.getAllClient = asyncHandler(async (req, res, next) => {
  const result = await clientModel.getAll();

  if (!result || result.length === 0) {
    throw new ErrorAPI("No clients found", 404);
  }
  res.status(200).json({
    status: "success",
    results: result.length,
    data: result,
  });
});

exports.getClientById = asyncHandler(async (req, res, next) => {
  const result = await clientModel.getById(req.params.clientId);

  if (!result || result.length === 0) {
    throw new ErrorAPI("No clients found", 404);
  }

  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.updateClient = asyncHandler(async (req, res, next) => {
  const result = await clientModel.update(req.params.clientId, req.body);
  if (!result || result.length === 0) {
    throw new ErrorAPI("Client not updated", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Client is updated",
  });
});

exports.deleteClient = asyncHandler(async (req, res, next) => {
  const result = await clientModel.delete(req.params.clientId);

  if (!result || result.length === 0) {
    throw new ErrorAPI("No clients found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "client is deleted",
  });
});
