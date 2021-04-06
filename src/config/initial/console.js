const util = require("util");

// Override console.log
console.log = function (...args) {
  print(args);
};

console.error = function (...args) {
  print(args);
};

function print(data) {
  const date = `[${new Date().toISOString()}]: `;
  const writeData = date + data.map((el) => util.format(el)).join(" ") + "\n";
  process.stdout.write(writeData);
}
