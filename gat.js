require("tsconfig-paths/register");
require("dotenv").config({ path: ".env" });

const argv = process.argv.slice(2);

const jwt = require("common/helpers/jwt");
jwt.generateToken({ id: parseInt(argv[0]) || 1 }).then(console.log);
