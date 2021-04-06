const express = require("express");
const upload = require("middleware/upload");

const { updateAvatar, uploadImage, allUpdate, infoUpdate, settingUpdate } = require("routes/api/update.controller");

const { AVATAR, GALLERY, IMAGE } = require("common/constants");
const { validation } = require("middleware/validation");
const { authenticate, authWithoutName } = require("middleware/authenticate");

const router = express.Router();

router.post("/user/update/setting", authenticate, settingUpdate.validation, validation, settingUpdate.controller);

router.post(
  "/user/update/all",
  authWithoutName,
  upload.fields([
    { name: AVATAR, maxCount: 1 },
    { name: GALLERY, maxCount: 5 },
  ]),
  allUpdate.validation,
  validation,
  allUpdate.controller
);

router.post(
  "/user/update/info",
  authWithoutName,
  upload.fields([
    { name: AVATAR, maxCount: 1 },
    { name: GALLERY, maxCount: 5 },
  ]),
  infoUpdate.validation,
  validation,
  infoUpdate.controller
);

router.post(
  "/user/update/avatar",
  authenticate,
  upload.single(AVATAR),
  updateAvatar.validation,
  validation,
  updateAvatar.controller
);

router.post(
  "/user/upload/image",
  authenticate,
  upload.single(IMAGE),
  uploadImage.validation,
  validation,
  uploadImage.controller
);

module.exports = router;
