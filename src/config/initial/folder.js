const fs = require("fs");

const { STATIC_PATH, IMAGE_PATH } = require("common/constants");

// Create folder
if (!fs.existsSync(STATIC_PATH)) fs.mkdirSync(STATIC_PATH);
if (!fs.existsSync(IMAGE_PATH)) fs.mkdirSync(IMAGE_PATH);
