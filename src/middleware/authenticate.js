const APIError = require("common/utils/ApiError");
const jwt = require("common/helpers/jwt");
const User = require("models/user");

module.exports.authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const { id } = await jwt.verifyToken(token);
    const user = await User.findOne({ where: { id } });

    if (!user.name) throw "";
    req.user = user;
    next();
  } catch (error) {
    // console.error(error);
    throw new APIError({ status: 403 });
  }
};

module.exports.authWithoutName = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const { id } = await jwt.verifyToken(token);
    const user = await User.findOne({ where: { id } });

    if (!user) throw "";
    req.user = user;
    next();
  } catch (error) {
    // console.error(error);
    throw new APIError({ status: 403 });
  }
};
