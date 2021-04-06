const config = require("./config.json");
const services = require("./services.json");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(services),
  ...config,
});

module.exports = admin;

// module.exports.pushNotification = async ({ receiverId, ...notification }) => {
//   try {
//     const devices = await Device.findAll({
//       where: { userId: receiverId, status: 1 },
//     });

//     const tokens = devices.filter((device) => device?.fcmToken).map((device) => device.fcmToken);

//     if (tokens.length > 0) {
//       admin.messaging().sendMulticast({
//         ...notification,
//         tokens,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
