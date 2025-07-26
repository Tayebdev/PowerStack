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
