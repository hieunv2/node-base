const database = require("database");
const BaseModel = require("common/utils/BaseModel");

const { DataTypes } = require("sequelize");
const { calculateAge } = require("common/utils");

const fields = {
  phone: {
    type: DataTypes.STRING,
    field: "phone",
  },
  facebookId: {
    type: DataTypes.STRING,
    field: "facebook_id",
  },
  instagramId: {
    type: DataTypes.STRING,
    field: "instagram_id",
  },
  description: {
    type: DataTypes.STRING,
    field: "description",
  },
  name: {
    type: DataTypes.STRING,
    field: "name",
  },
  sex: {
    type: DataTypes.INTEGER,
    field: "sex",
  },
  dob: {
    type: DataTypes.DATE,
    field: "dob",
  },
  age: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.dob) {
        return calculateAge(this.dob);
      }
    },
  },
  avatarId: {
    type: DataTypes.INTEGER,
    field: "avatar_id",
  },
};

const config = {
  sequelize: database,
  underscored: true,
  modelName: "User",
  tableName: "users",
};

class User extends BaseModel {
  static associate(models) {
    User.belongsTo(models.Image, {
      foreignKey: "avatarId",
      as: "avatar",
      constraints: false,
    });

    models.Image.belongsTo(User, {
      foreignKey: "id",
      as: "user",
    });
  }
}

User.init(fields, config);

module.exports = User;
