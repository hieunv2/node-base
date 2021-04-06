const database = require("database");
const BaseModel = require("common/utils/BaseModel");

const { DataTypes } = require("sequelize");

const fields = {
  userId: {
    type: DataTypes.INTEGER,
    field: "user_id",
  },
  imageId: {
    type: DataTypes.INTEGER,
    field: "image_id",
  },
};

const config = {
  sequelize: database,
  underscored: true,
  modelName: "UserImage",
  tableName: "users_images",
};

class UserImage extends BaseModel {
  static associate(models) {
    models.User.belongsToMany(models.Image, {
      through: UserImage,
      foreignKey: "userId",
      as: "images",
    });
  }
}

UserImage.init(fields, config);

module.exports = UserImage;
