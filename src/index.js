require("./config");

const { createConnection, closeConnection } = require("database");

createConnection()
  .then(() => {
    try {
      const models = require("models");
      models.createAssociate();

      const server = require("server");
      server.createServer();

      const socket = require("socket");
      socket.createSockets();

      const swagger = require("swagger");
      swagger.createDocument();
    } catch (error) {
      console.error(error);
      closeConnection();
    }
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
