const database = require("database");
const BaseModel = require("common/utils/BaseModel");

const { DataTypes } = require("sequelize");

const fields = {
  senderId: {
    type: DataTypes.INTEGER,
    field: "sender_id",
  },
  conversationId: {
    type: DataTypes.INTEGER,
    field: "conversation_id",
  },
  message: {
    type: DataTypes.STRING,
    field: "message",
  },
};

const config = {
  sequelize: database,
  underscored: true,
  modelName: "Message",
  tableName: "messages",
};

class Message extends BaseModel {
  static associate(models) {
    Message.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "user",
    });
  }
}

Message.init(fields, config);

module.exports = Message;
