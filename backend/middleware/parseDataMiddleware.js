const ErrorAPI = require("../utils/ErrorAppi");
exports.parseFormDataArrays = (req, res, next) => {
  if (req.body.flavor && typeof req.body.flavor === "string") {
    try {
      req.body.flavor = JSON.parse(req.body.flavor);
    } catch (err) {
      return next(new ErrorAPI("Invalid flavor format. Must be a valid JSON array.", 400));
    }
  }
  next();
};