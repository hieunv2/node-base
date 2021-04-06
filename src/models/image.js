const database = require("database");
const BaseModel = require("common/utils/BaseModel");

const { DataTypes } = require("sequelize");

const fields = {
  name: {
    type: DataTypes.STRING,
    field: "name",
  },
  type: {
    type: DataTypes.STRING,
    field: "type",
  },
  like: {
    type: DataTypes.INTEGER,
    field: "like",
  },
};

const config = {
  sequelize: database,
  underscored: true,
  modelName: "Image",
  tableName: "images",
};

class Image extends BaseModel {}

Image.init(fields, config);

module.exports = Image;

module.exports.avatar = {
  model: Image,
  as: "avatar",
  attributes: ["id", "name", "like"],
};

module.exports.images = {
  model: Image,
  as: "images",
  attributes: ["id", "name", "like"],
  through: { attributes: [] },
};
