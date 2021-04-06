const fs = require("fs");
const path = require("path");

let paths = {};

fs.readdirSync(__dirname)
  .filter((file) => fs.statSync(path.join(__dirname, file)).isDirectory())
  .forEach((directory) => {
    fs.readdirSync(path.join(__dirname, directory))
      .filter((file) => file.includes(".document.js"))
      .forEach((file) => {
        const document = require(path.join(__dirname, directory, file));
        paths = { ...paths, ...document };
      });
  });

module.exports = paths;
