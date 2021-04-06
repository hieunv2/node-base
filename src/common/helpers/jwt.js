const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("common/constants");

module.exports.generateToken = (user, tokenLife = "7d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, { expiresIn: tokenLife }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
