const User = require("models/user");
const Image = require("models/image");
const UserImage = require("models/user-image");

const Response = require("common/utils/Response");
const APIError = require("common/utils/ApiError");

const sequelize = require("database");

const { AVATAR, GALLERY } = require("common/constants");
const { checkSchema } = require("express-validator");
// const { Op } = require("sequelize");

module.exports.updateAvatar = {
  validation: checkSchema({}),

  controller: async (req, res) => {
    const { id } = req.user;

    if (!req.file) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["Avatar not found"],
        status: 405,
      });
    }

    req.transaction = await sequelize.transaction();

    const avatar = await Image.safeCreate({
      values: {
        name: req.file.filename,
        type: req.file.mimetype,
      },
      transaction: req.transaction,
    });

    await User.safeUpdate({
      values: { avatarId: avatar.id },
      where: { id: id },
      transaction: req.transaction,
    });

    await req.transaction.commit();

    res
      .status(200)
      .send(new Response({ status: 200 }))
      .end();
  },
};

module.exports.uploadImage = {
  validation: checkSchema({}),

  controller: async (req, res) => {
    const { id } = req.user;

    if (!req.file) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["Image not found"],
        status: 405,
      });
    }

    req.transaction = await sequelize.transaction();

    const image = await Image.safeCreate({
      values: {
        name: req.file.filename,
        type: req.file.mimetype,
      },
      transaction: req.transaction,
    });

    await UserImage.safeCreate({
      values: { imageId: image.id, userId: id },
      transaction: req.transaction,
    });

    await req.transaction.commit();

    res
      .status(200)
      .send(new Response({ status: 200 }))
      .end();
  },
};

module.exports.allUpdate = {
  validation: checkSchema({
    name: {
      in: ["body"],
      toString: true,
      isString: true,
    },
    sex: {
      in: ["body"],
      toInt: true,
      isInt: true,
    },
    description: {
      in: ["body"],
      toString: true,
      isString: true,
    },
    dob: {
      in: ["body"],
      isDate: true,
      toDate: true,
    },
    favorites: {
      in: ["body"],
      isArray: true,
    },
    "favorites.*": {
      in: ["body"],
      isInt: true,
    },
  }),

  controller: async (req, res) => {
    const { id } = req.user;
    const { name, sex, description, dob, favorites } = req.body;

    console.log(favorites);
    console.log(req.files[AVATAR]);
    console.log(req.files[GALLERY]);

    if (!req.files[AVATAR]?.length || req.files[AVATAR].length < 1) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["Avatar not found"],
        status: 405,
      });
    }

    if (!req.files[GALLERY]?.length || req.files[GALLERY]?.length < 1) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["Gallery not found"],
        status: 405,
      });
    }

    req.transaction = await sequelize.transaction();

    const images = await Image.safeBulkCreate({
      values: req.files[GALLERY].map((file) => {
        return {
          name: file.filename,
          type: file.mimetype,
        };
      }),
      transaction: req.transaction,
    });

    await UserImage.destroy({
      where: { userId: id },
      transaction: req.transaction,
    });

    await UserImage.safeBulkCreate({
      values: images.map((image) => {
        return {
          userId: id,
          imageId: image.id,
        };
      }),
      transaction: req.transaction,
    });

    await UserFavorite.destroy({
      where: { userId: id },
      transaction: req.transaction,
    });

    await UserFavorite.safeBulkCreate({
      values: [...new Set(favorites)].map((favorite) => {
        return {
          userId: id,
          favoriteId: favorite,
        };
      }),
      transaction: req.transaction,
    });

    const image = await Image.safeCreate({
      values: {
        name: req.files[AVATAR][0].filename,
        type: req.files[AVATAR][0].mimetype,
      },
      transaction: req.transaction,
    });

    await User.safeUpdate({
      values: {
        name,
        sex,
        dob: new Date(dob),
        description,
        avatarId: image.id,
      },
      where: { id: id },
      transaction: req.transaction,
    });

    await req.transaction.commit();

    res
      .status(200)
      .send(new Response({ status: 200 }))
      .end();
  },
};

module.exports.infoUpdate = {
  validation: checkSchema({
    name: {
      in: ["body"],
      optional: true,
      toString: true,
      isString: true,
    },
    sex: {
      in: ["body"],
      optional: true,
      toInt: true,
      isInt: true,
    },
    description: {
      in: ["body"],
      optional: true,
      toString: true,
      isString: true,
    },
    dob: {
      in: ["body"],
      optional: true,
      isDate: true,
      toDate: true,
    },
    favorites: {
      in: ["body"],
      optional: true,
      isArray: true,
    },
    "favorites.*": {
      in: ["body"],
      optional: true,
      isInt: true,
    },
    deletedImages: {
      in: ["body"],
      optional: true,
      isArray: true,
    },
    "deletedImages.*": {
      in: ["body"],
      optional: true,
      toInt: true,
      isInt: true,
    },
  }),

  controller: async (req, res) => {
    const { id } = req.user;
    const { name, sex, description, dob, favorites, deletedImages } = req.body;

    req.transaction = await sequelize.transaction();

    console.log(deletedImages);

    if (deletedImages) {
      await UserImage.destroy({
        where: { userId: id, imageId: deletedImages },
        transaction: req.transaction,
      });
    }

    if (req.files[GALLERY]?.length >= 1) {
      const images = await Image.safeBulkCreate({
        values: req.files[GALLERY].map((file) => {
          return {
            name: file.filename,
            type: file.mimetype,
          };
        }),
        transaction: req.transaction,
      });

      await UserImage.safeBulkCreate({
        values: images.map((image) => {
          return {
            userId: id,
            imageId: image.id,
          };
        }),
        transaction: req.transaction,
      });
    }

    if (favorites?.length >= 1) {
      await UserFavorite.destroy({
        where: { userId: id },
        transaction: req.transaction,
      });

      await UserFavorite.safeBulkCreate({
        values: [...new Set(favorites)].map((favorite) => {
          return {
            userId: id,
            favoriteId: favorite,
          };
        }),
        transaction: req.transaction,
      });
    }

    let avatarId;
    if (req.files[AVATAR]?.length >= 1) {
      const image = await Image.safeCreate({
        values: {
          name: req.files[AVATAR][0].filename,
          type: req.files[AVATAR][0].mimetype,
        },
        transaction: req.transaction,
      });

      avatarId = image.id;
    }

    await User.safeUpdate({
      values: {
        ...(name && { name }),
        ...(sex && { sex }),
        ...(dob && { dob: new Date(dob) }),
        ...(description && { description }),
        ...(avatarId && { avatarId }),
      },
      where: { id: id },
      transaction: req.transaction,
    });

    await req.transaction.commit();

    res
      .status(200)
      .send(new Response({ status: 200 }))
      .end();
  },
};

module.exports.settingUpdate = {
  validation: checkSchema({
    fromAge: {
      in: ["body"],
      toInt: true,
      isInt: true,
    },
    toAge: {
      in: ["body"],
      toInt: true,
      isInt: true,
    },
    sex: {
      in: ["body"],
      toInt: true,
      isInt: true,
    },
  }),

  controller: async (req, res) => {
    req.transaction = await sequelize.transaction();

    await req.transaction.commit();

    res
      .status(200)
      .send(new Response({ status: 200 }))
      .end();
  },
};
