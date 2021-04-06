const config = require("./config");
const server = require("server");
const socketIO = require("socket.io");
const onConnection = require("socket/connections");

const io = socketIO(server, config);

module.exports = io;

module.exports.createSockets = () => {
  io.on("connection", onConnection);
};
