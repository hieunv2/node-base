const swaggerUi = require("swagger-ui-express");
const paths = require("routes/documents");
const components = require("swagger/components");
const express = require("express");

const { DOCUMENT_PORT } = require("common/constants");

const documents = {
  openapi: "3.0.0",
  info: {
    version: "0.1.0",
    title: "Tora",
  },
  servers: [{ url: "http://103.110.86.232:1324/api" }, { url: "http://localhost:1324/api/" }],
  components,
  paths,
};

const app = express();
app.use("/", swaggerUi.serve, swaggerUi.setup(documents));

module.exports.createDocument = () => {
  app.listen(DOCUMENT_PORT, () => {
    console.log(`Document is running at http://localhost:${DOCUMENT_PORT}`);
  });
};
