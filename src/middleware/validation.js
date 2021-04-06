const APIError = require("common/utils/ApiError");

const { validationResult } = require("express-validator");

module.exports.validation = (req, res, next) => {
  const errorFormatter = ({ msg, param }) => {
    return `[${param}]: ${msg}`;
  };

  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    throw new APIError({
      message: "Validation Failed",
      status: 405,
      errors: errors.array(),
    });
  }

  next();
};
