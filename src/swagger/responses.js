module.exports = {
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        example: {
          success: false,
          message: "Internal Server Error",
          status: 500,
        },
      },
    },
  },
  403: {
    description: "Forbidden",
    content: {
      "application/json": {
        example: {
          success: false,
          message: "Forbidden",
          status: 403,
        },
      },
    },
  },
  404: {
    description: "Not Found",
    content: {
      "application/json": {
        example: {
          success: false,
          message: "Not Found",
          status: 404,
        },
      },
    },
  },
  405: {
    description: "Validation Failed",
    content: {
      "application/json": {
        example: {
          success: false,
          message: "Validation Failed",
          status: 405,
          errors: ["[name] is required", "User not in store"],
        },
      },
    },
  },
  200: {
    description: "OK",
    content: {
      "application/json": {
        example: {
          success: true,
          status: 200,
          message: "OK",
        },
      },
    },
  },
  201: {
    description: "Created",
    content: {
      "application/json": {
        example: {
          success: true,
          status: 201,
          message: "Created",
        },
      },
    },
  },
};
