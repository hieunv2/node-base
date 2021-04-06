const express = require("express");

const { phoneLogin, appLogin } = require("routes/api/auth.controller");
const { validation } = require("middleware/validation");

const router = express.Router();

router.post("/auth/login/phone", phoneLogin.validation, validation, phoneLogin.controller);

router.post("/auth/login/app", phoneLogin.validation, validation, appLogin.controller);

module.exports = router;
