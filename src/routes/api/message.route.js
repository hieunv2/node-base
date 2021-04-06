const express = require("express");

const { validation } = require("middleware/validation");
const { authenticate } = require("middleware/authenticate");
const { conversations, messages } = require("routes/api/message.controller");

const router = express.Router();

router.get("/user/conversations", authenticate, conversations.validation, validation, conversations.controller);

router.get("/user/messages", authenticate, messages.validation, validation, messages.controller);

module.exports = router;
