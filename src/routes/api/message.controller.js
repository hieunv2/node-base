const Conversation = require("models/conversation");
const Participant = require("models/participants");
const User = require("models/user");
const Message = require("models/message");

const Response = require("common/utils/Response");
const APIError = require("common/utils/ApiError");

const sequelize = require("database");

const { avatar } = require("models/image");
const { Op } = require("sequelize");
const { checkSchema } = require("express-validator");
const { GROUP_AVATAR } = require("common/constants");

module.exports.conversations = {
  validation: checkSchema({
    page: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
    pageSize: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
  }),

  controller: async (req, res) => {
    const { id } = req.user;
    const { page, pageSize, name } = req.query;

    const participants = await Participant.findAll({
      where: { userId: id },
    });

    const query =
      "SELECT messages.created_at FROM messages WHERE  messages.conversation_id=Conversation.id ORDER BY messages.created_at DESC LIMIT 1";

    const _conversations = await Conversation.findAll({
      where: { id: participants.map((el) => el.conversationId) },

      include: [
        {
          model: Participant,
          attributes: [],
          as: "participants",
          required: true,
          where: { userId: { [Op.not]: id } },
          include: [
            {
              model: User,
              attributes: [],
              required: true,
              as: "user",
              where: {
                ...(name && { name: { [Op.like]: `%${name}%` } }),
              },
            },
          ],
        },
      ],
    });

    const conversations = await Conversation.paginate({
      page,
      pageSize,
      where: { id: _conversations.map((el) => el.id) },
      attributes: {
        include: [[sequelize.literal(`(${query})`), "lastMessageAt"]],
      },
      order: [[sequelize.literal("lastMessageAt"), "DESC"]],
      include: [
        {
          model: Message,
          as: "messages",
          limit: 1,
          order: [["createdAt", "desc"]],
        },
        {
          model: Participant,
          as: "participants",
          // where: { userId: { [Op.not]: id } },
          include: [
            {
              model: User,
              attributes: ["id", "name"],
              as: "user",
              include: [{ ...avatar }],
            },
          ],
        },
      ],

      transform: (rows) =>
        rows
          .filter((el) => el.participants?.length > 1)
          .map((row) => ({
            ...row.toJSON(),
            name: !row?.isGroup ? row.participants.find((el) => el.userId != id).user.name : row.name,
            avatar: !row?.isGroup ? row.participants.find((el) => el.userId != id).user.avatar.name : GROUP_AVATAR,
            participants: row?.participants.map((el) => el.user),
          })),
    });

    res
      .status(200)
      .send(new Response({ ...conversations }))
      .end();
  },
};

module.exports.messages = {
  validation: checkSchema({
    conversationId: {
      in: ["query"],
      toInt: true,
      isInt: true,
    },
    page: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
    pageSize: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
    message: {
      in: ["query"],
      optional: true,
      toString: true,
      isString: true,
    },
  }),

  controller: async (req, res) => {
    const { id } = req.user;
    const { conversationId, page, pageSize, message } = req.query;

    const user = await Participant.findOne({
      where: { conversationId, userId: id },
    });

    if (!user) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["User is not in conversations"],
        status: 405,
      });
    }

    const messages = await Message.paginate({
      page,
      pageSize,
      attributes: ["id", "message", "senderId", "createdAt"],
      order: [
        ["createdAt", "DESC"],
        ["updatedAt", "DESC"],
      ],
      where: {
        conversationId,
        ...(message && { message: { [Op.like]: `%${message}%` } }),
      },
    });

    res
      .status(200)
      .send(new Response({ ...messages }))
      .end();
  },
};

module.exports.participants = {
  validation: checkSchema({
    conversationId: {
      in: ["query"],
      toInt: true,
      isInt: true,
    },
    page: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
    pageSize: {
      in: ["query"],
      optional: true,
      toInt: true,
      isInt: true,
    },
  }),

  controller: async (req, res) => {
    const { id } = req.user;
    const { conversationId, page, pageSize } = req.query;

    const user = await Participant.findOne({
      where: { conversationId, userId: id },
    });

    if (!user) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["User not in conversations"],
        status: 405,
      });
    }

    const participants = await Participant.paginate({
      page,
      pageSize,
      where: { conversationId },
    });

    res
      .status(200)
      .send(new Response({ ...participants }))
      .end();
  },
};
