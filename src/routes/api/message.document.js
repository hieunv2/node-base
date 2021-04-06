const { page, pageSize } = require("swagger/params");
const responses = require("swagger/responses");

module.exports = {
  "/user/conversations": {
    get: {
      summary: "Get conversation of user",
      tags: ["message"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "name",
          schema: { type: "string" },
          description: "Name to search",
        },
        page,
        pageSize,
      ],
      responses: {
        500: responses[500],
        403: responses[403],
        200: {
          description: "Success get conversations",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                total: 8,
                page: 1,
                pageSize: 2,
                lastPage: 4,
                data: [
                  {
                    id: 1,
                    name: "name EvdamHvfVhpeYjumdGrb",
                    participants: [
                      {
                        id: 1,
                        name: "No",
                        avatar: "anh4.jpg",
                      },
                      {
                        id: 2,
                        name: "No name",
                        avatar: "anh4.jpg",
                      },
                    ],
                  },
                  {
                    id: 2,
                    name: "name xTxrEaXROFjA",
                    participants: [
                      {
                        id: 1,
                        name: "No",
                        avatar: "anh4.jpg",
                      },
                      {
                        id: 3,
                        name: "Hiếu",
                        avatar: "anh6.jpg",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  "/user/messages": {
    get: {
      summary: "Get message of conversations",
      tags: ["message"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          required: true,
          name: "conversationId",
          schema: { type: "number" },
          description: "Conversation Id",
        },
        {
          in: "query",
          name: "message",
          schema: { type: "string" },
          description: "Message to search",
        },
        page,
        pageSize,
      ],
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: {
          description: "Success get messages",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                total: 1000,
                page: 1,
                pageSize: 2,
                lastPage: 500,
                data: [
                  {
                    id: 1000,
                    message: "Chào Vượng",
                    createdAt: "2021-02-24T05:13:17.000Z",
                    senderId: 2,
                  },
                  {
                    id: 999,
                    message: "Chào Hiếu",
                    createdAt: "2021-02-24T05:13:16.000Z",
                    senderId: 2,
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};
