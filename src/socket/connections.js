const User = require("models/user");
const Conversation = require("models/conversation");
const Participant = require("models/participants");
const Message = require("models/message");

const sockets = require("socket/storages");
const sequelize = require("database");

const { verifyToken } = require("common/helpers/jwt");
const { avatar } = require("models/image");
const { pushNotification } = require("firebase");
// const { Op } = require("sequelize");

module.exports = (socket) => {
  socket.on("authenticate", async ({ accessToken }) => {
    try {
      const token = accessToken || "";
      const { id } = await verifyToken(token);

      console.log(`Socket connect ${id} ${socket.id}`);

      const user = await User.findOne({
        attributes: ["id", "name"],
        where: { id },
        include: [{ ...avatar }],
      });

      socket.user = user;

      if (sockets[id]?.list) {
        sockets[id].list.push(socket);
      } else {
        sockets[id] = { list: [socket] };
      }

      socket.emit("authenticated");
    } catch {
      console.error("Socket forbidden");
    }
  });

  socket.on("send-message", async ({ uuid, conversationId, receiverId, message }) => {
    console.log("Send", conversationId, receiverId, message);

    if (!socket.user || !message || !uuid || !(conversationId || receiverId)) {
      socket.emit("sent-failed", { uuid });
      return;
    }

    console.log("Receive ", conversationId, receiverId, message);

    const { id, name } = socket.user;
    const t = await sequelize.transaction();

    try {
      let participants;

      if (!conversationId && receiverId) {
        const receiver = await User.findOne({
          attributes: ["id", "name"],
          where: { id: receiverId },
          include: [{ ...avatar }],
        });

        if (!receiver) {
          socket.emit("sent-failed", { uuid });
          return;
        }

        const conversation = await Conversation.safeCreate({
          values: { createdAt: new Date(), updatedAT: new Date() },
          transaction: t,
        });

        conversationId = conversation.id;

        participants = await Participant.safeBulkCreate({
          values: [
            { conversationId, userId: id },
            { conversationId, userId: receiverId },
          ],
          transaction: t,
        });

        const newConversation = {
          id: conversationId,
          name: receiver.name || "",
          isGroup: false,
          avatar: receiver.avatar.name,
          participants: [receiver, socket.user],
        };

        socket.emit("conversation", { conversation: newConversation });
      } else {
        participants = await Participant.findAll({
          where: { conversationId },
        });

        if (participants.findIndex((el) => el.userId == id) == -1) {
          socket.emit("sent-failed", { uuid });
          return;
        }
      }

      const createdAt = new Date();

      await Message.safeCreate({
        values: {
          senderId: id,
          conversationId,
          message,
          createdAt,
        },
        transaction: t,
      });

      await t.commit();

      socket.emit("sent", { uuid });

      participants
        .filter((el) => el.userId != id)
        .forEach((participant) => {
          const userId = participant.userId;
          if (userId) {
            if (sockets[userId]?.list?.length >= 1) {
              sockets[userId]?.list.forEach((socket) => {
                socket.emit("received-message", {
                  uuid,
                  conversationId,
                  senderId: id,
                  message,
                  createdAt,
                });
              });
            } else {
              pushNotification({
                receiverId: userId,
                notification: {
                  title: name,
                  body: message,
                },
              });
            }
          }
        });
    } catch (error) {
      console.error(error);
      await t.rollback();
      socket.emit("sent-failed", { uuid });
    }
  });

  socket.on("disconnect", () => {
    if (!socket.user) return;

    const { id } = socket.user;

    console.log(`Socket disconnect ${id} ${socket.id}`);

    if (sockets[id]?.list) {
      const index = sockets[id].list.indexOf(socket.id) || -1;
      if (index > -1) {
        sockets[id].list.splice(index, 1);
      }
    }
  });
};
