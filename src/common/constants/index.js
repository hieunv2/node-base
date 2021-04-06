const path = require("path");

module.exports.STATUS = require("http").STATUS_CODES;

module.exports.JWT_SECRET = process.env.JWT_SECRET || "developer@vuongninh";

module.exports.PORT = parseInt(process.env.PORT || "1324");

module.exports.DOCUMENT_PORT = parseInt(process.env.DOCUMENT_PORT || "1325");

module.exports.STATIC_PATH = path.join(process.cwd(), process.env.STATIC_FOLDER || "/public");

module.exports.LOG_PATH = path.join(process.cwd(), process.env.LOG_FOLDER || "/log");

module.exports.IMAGE_PATH = path.join(this.STATIC_PATH, "/images");

module.exports.AVATAR = "avatar";
module.exports.GALLERY = "gallery";
module.exports.IMAGE = "image";

module.exports.MAX_FILE_SIZE = 10 * 1024 * 1024;

module.exports.STORE_AGE = 60 * 60 * 1000;

module.exports.GROUP_AVATAR =
  "https://png.pngtree.com/element_our/png_detail/20181021/group-avatar-icon-design-vector-png_141882.jpg";
