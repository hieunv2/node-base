const User = require("models/user");

const Response = require("common/utils/Response");

const { checkSchema } = require("express-validator");

module.exports.me = {
  validation: checkSchema({}),

  controller: async (req, res) => {
    const { id } = req.user;

    const user = await User.findOne({
      where: { id },
    });

    res
      .status(200)
      .send(new Response({ data: user }))
      .end();
  },
};

module.exports.all = {
  validation: checkSchema({}),

  controller: async (req, res) => {
    const { page, pageSize } = req.query;

    const stores = await User.paginate({
      page,
      pageSize,
      attributes: ["id", "name", "description", "phone"],
    });

    res
      .status(200)
      .send(new Response({ ...stores }))
      .end();
  },
};
