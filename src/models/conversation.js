const database = require("database");
const BaseModel = require("common/utils/BaseModel");

const { DataTypes } = require("sequelize");

const fields = {
  name: {
    type: DataTypes.STRING,
    field: "name",
  },
  isGroup: {
    type: DataTypes.BOOLEAN,
    field: "is_group",
  },
};

const config = {
  sequelize: database,
  underscored: true,
  modelName: "Conversation",
  tableName: "conversations",
};

class Conversation extends BaseModel {
  static associate(models) {
    Conversation.hasMany(models.Participant, {
      foreignKey: "conversationId",
      as: "participants",
    });

    Conversation.hasMany(models.Message, {
      foreignKey: "conversationId",
      as: "messages",
    });
  }
}

Conversation.init(fields, config);

module.exports = Conversation;
