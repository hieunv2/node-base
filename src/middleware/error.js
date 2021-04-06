const APIError = require("common/utils/ApiError");

const { MulterError } = require("multer");
const { BaseError } = require("sequelize");

// eslint-disable-next-line no-unused-vars
module.exports.notFound = (req, res, next) => {
  throw new APIError({ status: 404 });
};

module.exports.uploadError = (err, req, res, next) => {
  if (err instanceof MulterError) {
    console.log(err);
    throw new APIError({
      status: 405,
      errors: [`An error when upload image in field ${err?.field}`],
    });
  }

  next(err);
};

module.exports.databaseError = (err, req, res, next) => {
  if (err instanceof BaseError) {
    console.log(err);
    req?.transaction?.rollback().catch((err) => console.log(err));
    throw new APIError({ errors: ["An error when access database"] });
  }

  next(err);
};

// eslint-disable-next-line no-unused-vars
module.exports.handlerError = (err, req, res, next) => {
  if (!(err instanceof APIError)) {
    console.error(err);
    err = new APIError({
      message: err.message || "Unknown Error",
      status: 500,
    });
  }

  res
    .status(err.status)
    .send({
      success: false,
      message: err.message,
      status: err.status,
      errors: err.errors,
      // stack: err.stack,
    })
    .end();
};
