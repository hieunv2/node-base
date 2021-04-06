const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

fs.readdirSync(__dirname)
  .filter((file) => fs.statSync(path.join(__dirname, file)).isDirectory())
  .forEach((directory) => {
    fs.readdirSync(path.join(__dirname, directory))
      .filter((file) => file.includes(".route.js"))
      .forEach((file) => {
        const pathRouter = require(path.join(__dirname, directory, file));
        router.use(`/${directory}`, pathRouter);
      });
  });

module.exports = router;
