const User = require("models/user");

const APIError = require("common/utils/ApiError");
const Response = require("common/utils/Response");

const sequelize = require("database");
const firebase = require("firebase");
const jwt = require("common/helpers/jwt");

const { checkSchema } = require("express-validator");

module.exports.phoneLogin = {
  validation: checkSchema({
    firebaseIdToken: {
      in: ["body"],
      toString: true,
      isString: true,
    },
  }),

  controller: async (req, res) => {
    const { firebaseIdToken } = req.body;

    req.transaction = await sequelize.transaction();

    const decodedToken = await firebase.auth().verifyIdToken(firebaseIdToken);
    if (!decodedToken?.phone_number) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["Do not found phone number"],
        status: 405,
      });
    }

    let user = await User.findOne({
      where: { phone: decodedToken.phone_number },
    });

    if (!user) {
      user = await User.safeCreate({
        values: { phone: decodedToken.phone_number },
        transaction: req.transaction,
      });
    }

    await req.transaction.commit();

    const response = new Response({
      data: {
        isNewUser: user?.name ? false : true,
        accessToken: await jwt.generateToken({ id: user?.id }),
      },
    });

    res.status(200).send(response).end();
  },
};

module.exports.appLogin = {
  validation: checkSchema({
    firebaseIdToken: {
      in: ["body"],
      toString: true,
      isString: true,
    },
  }),

  controller: async (req, res) => {
    const { firebaseIdToken, facebookId, instagramId } = req.body;

    const whereStatement = {};
    await firebase.auth().verifyIdToken(firebaseIdToken);

    if (facebookId) {
      whereStatement.facebookId = facebookId;
    } else if (instagramId) {
      whereStatement.instagramId = instagramId;
    }

    if (Object.keys(whereStatement).length < 1) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["facebookId or instagramId not found "],
        status: 405,
      });
    }

    const user = await User.findOne(whereStatement);

    if (!user?.id) {
      throw new APIError({
        message: "Validation Failed",
        errors: ["User do not exist "],
        status: 405,
      });
    }

    const response = new Response({
      data: {
        accessToken: await jwt.generateToken({ id: user.id }),
      },
    });

    res.status(200).send(response).end();
  },
};
