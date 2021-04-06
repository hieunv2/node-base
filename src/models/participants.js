const database = require("database");
const BaseModel = require("common/utils/BaseModel");

const { DataTypes } = require("sequelize");

const fields = {
  conversationId: {
    type: DataTypes.INTEGER,
    field: "conversation_id",
  },
  userId: {
    type: DataTypes.INTEGER,
    field: "user_id",
  },
  nickname: {
    type: DataTypes.STRING,
    field: "nickname",
  },
};

const config = {
  sequelize: database,
  underscored: true,
  modelName: "Participant",
  tableName: "participants",
};

class Participant extends BaseModel {
  static associate(models) {
    Participant.belongsTo(models.Conversation, {
      foreignKey: "conversationId",
      as: "conversation",
    });

    Participant.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

Participant.init(fields, config);

module.exports = Participant;
