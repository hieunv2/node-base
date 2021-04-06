const { requestBody } = require("swagger/params");
const responses = require("swagger/responses");

module.exports = {
  "/auth/login/phone": {
    post: {
      summary: "Login by phone number",
      tags: ["auth"],
      requestBody: requestBody({
        firebaseIdToken: "*k3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdF*",
      }),
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: {
          description: "Success get conversations",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                data: {
                  isNewUser: true,
                  accessToken: "acqưc12cq21c qưc13c13c13 12d12",
                },
              },
            },
          },
        },
      },
    },
  },

  "/auth/login/app": {
    post: {
      summary: "Login by app",
      tags: ["auth"],
      requestBody: requestBody({
        facebookId: "*k3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdF*",
        instagramId: "*k3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdF*",
      }),
      responses: {
        500: responses[500],
        403: responses[403],
        405: responses[405],
        200: {
          description: "Success get conversations",
          content: {
            "application/json": {
              example: {
                success: true,
                status: 200,
                message: "OK",
                data: {
                  accessToken: "acqưc12cq21c qưc13c13c13 12d12",
                },
              },
            },
          },
        },
      },
    },
  },
};
