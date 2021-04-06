const { GALLERY, AVATAR, IMAGE } = require("common/constants");
const { requestBody } = require("swagger/params");
const responses = require("swagger/responses");

module.exports = {
  "/user/update/all": {
    post: {
      summary: "Update all information",
      tags: ["update"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        ...requestBody(
          { name: "Hiếu", sex: 0, description: "description" },
          true,
          [
            { name: AVATAR, max: 1 },
            { name: GALLERY, max: 5 },
          ],
          {
            dob: {
              type: "string",
              format: "date-time",
            },
            favorites: {
              type: "array",
              items: { type: "number" },
            },
          }
        ),
      },
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: responses[200],
      },
    },
  },

  "/user/update/info": {
    post: {
      summary: "Update information",
      tags: ["update"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        ...requestBody(
          { name: "Hiếu", sex: 0, description: "description" },
          true,
          [
            { name: AVATAR, max: 1 },
            { name: GALLERY, max: 5 },
          ],
          {
            dob: {
              type: "string",
              format: "date-time",
            },
            favorites: {
              type: "array",
              items: { type: "number" },
            },
          }
        ),
      },
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: responses[200],
      },
    },
  },

  "/user/update/setting": {
    post: {
      summary: "Update information",
      tags: ["update"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        ...requestBody({ fromAge: 18, toAge: 40, sex: 3 }),
      },
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: responses[200],
      },
    },
  },

  "/user/update/avatar": {
    post: {
      summary: "Update avatar",
      tags: ["update"],
      security: [{ bearerAuth: [] }],
      requestBody: requestBody({}, true, AVATAR),
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: responses[200],
      },
    },
  },

  "/user/upload/image": {
    post: {
      summary: "Upload a image",
      tags: ["update"],
      security: [{ bearerAuth: [] }],
      requestBody: requestBody({}, true, IMAGE),
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: responses[200],
      },
    },
  },
};
