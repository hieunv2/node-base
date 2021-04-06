const express = require("express");

const { me } = require("routes/api/user.controller");
const { all } = require("routes/api/user.controller");

const { validation } = require("middleware/validation");
const { authenticate } = require("middleware/authenticate");

const router = express.Router();

router.get("/user/me", authenticate, me.validation, validation, me.controller);
router.get("/user/all", me.validation, validation, all.controller);

module.exports = router;
