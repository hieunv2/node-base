const { page, pageSize, requestBody } = require("swagger/params");
const responses = require("swagger/responses");

module.exports = {
  "/user/me": {
    get: {
      summary: "Information of user",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      responses: {
        500: responses[500],
        403: responses[403],
        200: {
          description: "Success get information",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                data: {
                  id: 1,
                  phone: "012345678",
                  facebookId: "991598291319225",
                  instagramId: null,
                  description: "",
                  name: "",
                  sex: 1,
                  avatar: "1612787528860.jpg",
                  favorites: [
                    {
                      id: 1,
                      name: "Weekend Walking Street",
                      category: "PASSION",
                      key: "weekend_walking_street",
                    },
                    {
                      id: 2,
                      name: "WestLake Night Drive",
                      category: "PASSION",
                      key: "westlake_night_drive",
                    },
                    {
                      id: 3,
                      name: "Bar Hopping",
                      category: "PASSION",
                      key: "bar_hopping",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },

  "/user/liked": {
    get: {
      summary: "Get liked users of user",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      parameters: [
        page,
        pageSize,
        {
          in: "query",
          name: "name",
          schema: { type: "string" },
          description: "Search name of user",
        },
        {
          in: "query",
          name: "sex",
          schema: { type: "number" },
          description: "Search sex of user",
        },
        {
          in: "query",
          name: "description",
          schema: { type: "string" },
          description: "Search description of user",
        },
      ],
      responses: {
        500: responses[500],
        403: responses[403],
        200: {
          description: "Success get liked users",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                total: 1,
                page: 1,
                pageSize: 1,
                lastPage: 1,
                data: [
                  {
                    id: 13,
                    name: "Samori",
                    sex: 1,
                    description: null,
                    avatar: "anh12-2.jpg",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  "/user/be-liked": {
    get: {
      summary: "Get list of users like me",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      parameters: [
        page,
        pageSize,
        {
          in: "query",
          name: "name",
          schema: { type: "string" },
          description: "Search name of user",
        },
        {
          in: "query",
          name: "sex",
          schema: { type: "number" },
          description: "Search sex of user",
        },
        {
          in: "query",
          name: "description",
          schema: { type: "string" },
          description: "Search description of user",
        },
      ],
      responses: {
        500: responses[500],
        403: responses[403],
        200: {
          description: "Success get users",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                total: 1,
                page: 1,
                pageSize: 1,
                lastPage: 1,
                data: [
                  {
                    id: 13,
                    name: "Samori",
                    sex: 1,
                    description: null,
                    avatar: "anh12-2.jpg",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  "/user/matched": {
    get: {
      summary: "Get matched users of user",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      parameters: [
        page,
        pageSize,
        // {
        //   in: "query",
        //   name: "name",
        //   schema: { type: "string" },
        //   description: "Search name of user",
        // },
        // {
        //   in: "query",
        //   name: "sex",
        //   schema: { type: "number" },
        //   description: "Search sex of user",
        // },
        // {
        //   in: "query",
        //   name: "description",
        //   schema: { type: "string" },
        //   description: "Search description of user",
        // },
      ],
      responses: {
        500: responses[500],
        403: responses[403],
        200: {
          description: "Success get matched users",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                total: 2,
                page: 1,
                pageSize: 2,
                lastPage: 1,
                data: [
                  {
                    id: 2,
                    name: "No name",
                    sex: 1,
                    description: null,
                    avatar: "anh4.jpg",
                  },
                  {
                    id: 3,
                    name: "Hiếu",
                    sex: 0,
                    description: null,
                    avatar: "anh6.jpg",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  "/user/store/current": {
    get: {
      summary: "Get current store with user joined",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: {
          description: "Success get store",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                data: {
                  id: 2,
                  name: "CClub",
                  description: "",
                  address: "Cầu Giấy",
                  longitude: 24.0278,
                  latitude: 108.834,
                  avatar: "anh1-2.jpg",
                  images: ["anh2.jpg", "anh3.jpg"],
                },
              },
            },
          },
        },
      },
    },
  },

  "/user/store/not-liked": {
    get: {
      summary: "Get not liked users in store",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "storeId",
          required: true,
          schema: { type: "number" },
          description: "Id of store",
        },
        page,
        pageSize,
      ],
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: {
          description: "Success get matched users",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                total: 4,
                page: 1,
                pageSize: 2,
                lastPage: 2,
                data: [
                  {
                    id: 4,
                    name: "Trung",
                    sex: 0,
                    description: null,
                    avatar: "anh8.jpg",
                    images: ["anh5.jpg", "anh6-3.jpg"],
                  },
                  {
                    id: 8,
                    name: "name nzBqGpgFgsLyLtpEnGMnnEUoSrRHn",
                    sex: 1,
                    description: null,
                    avatar: "anh9-2.jpg",
                    images: ["anh7.jpg", "anh12.jpg"],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  "/user/like": {
    post: {
      summary: "Like user",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      requestBody: requestBody({
        receiverId: 8,
      }),
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        201: responses[201],
      },
    },
  },

  "/user/join": {
    post: {
      summary: "Join to store",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      requestBody: requestBody({ storeId: 2 }),
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: responses[200],
      },
    },
  },

  "/user/leave": {
    post: {
      summary: "Leave store",
      tags: ["user"],
      security: [{ bearerAuth: [] }],
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: responses[200],
      },
    },
  },
};
