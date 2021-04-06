const { IMAGE_PATH, MAX_FILE_SIZE } = require("common/constants");

const multer = require("multer");
const path = require("path");

module.exports = multer({
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype.startsWith("image"));
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, IMAGE_PATH);
    },
    filename: (req, file, cb) => {
      const fileName = Date.now().toFixed();
      cb(null, fileName + path.extname(file.originalname));
    },
  }),
});
