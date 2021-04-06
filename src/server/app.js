const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("routes");

const { STATIC_PATH, PORT } = require("common/constants");
const { handlerError, notFound, databaseError, uploadError } = require("../middleware/error");

const app = express();

app.set("port", PORT);
app.use(cors());
app.use(compression());
app.use(helmet());

app.use(express.static(STATIC_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require("morgan");
app.use(morgan("dev"));

app.use("/", router);
app.use(notFound);

app.use(uploadError);
app.use(databaseError);
app.use(handlerError);

module.exports = app;
