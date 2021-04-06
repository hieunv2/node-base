const http = require("http");
const app = require("./app");

const port = app.get("port");
const env = app.get("env");
const server = http.createServer(app);

function onListening() {
  console.log(`App is running at http://localhost:${port} in ${env} mode`);
}

function onError(error) {
  switch (error?.code) {
    case "EACCES":
      console.error(port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.exports = server;

module.exports.createServer = () => {
  server.listen(app.get("port"));
  server.on("error", onError);
  server.on("listening", onListening);
};
