// import { ENV } from "./constants/env.constant";
// import { getAxiosConfig } from "./utils/send-message-to-viber.util";

// app.post(EApis.webhook, async (req, res) => {
//   const body = req.body;
//   if (app.get("env") === "development") {
//     try {
//       await processRequest(req, res);
//       res.status(200).send();
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   } else {
//     //Warning!!! when setup set to false
//     const DEBUG_VERSION = true;
//     if (DEBUG_VERSION) {
//       try {
//         axios.post(
//           `${ENV.DEBUG_VIBER_SERVER_URL}webhook`,
//           body,
//           getAxiosConfig()
//         );
//         res.status(200).send();
//       } catch (error) {
//         console.log("error = ", error);
//         res.status(400).send(error);
//       }
//     } else {
//       try {
//         await processRequest(req, res);
//         res.status(200).send();
//       } catch (error) {
//         res.status(400).send(error);
//       }
//     }
//   }
// });

// app.get(EApis.setup, async (req, res) => {
//   try {
//     const data = await axios.post(
//       "https://chatapi.viber.com/pa/set_webhook",
//       {
//         url: `${ENV.VIBER_PROXY_SERVER_URL}webhook`,
//         event_types: [
//           //   "delivered",
//           //   "seen",
//           "failed",
//           "subscribed",
//           "unsubscribed",
//           "message",
//           "conversation_started",
//         ],
//         send_name: true,
//         send_photo: true,
//       },
//       getAxiosConfig()
//     );
//     console.log(data.data);
//     res.status(200).send(data.data);
//   } catch (error) {
//     console.log("error = ", error);
//     res.status(400).send(error);
//   }
// });

// app.get(EApis.unSetup, async (req, res) => {
//   try {
//     const data = await axios.post(
//       "https://chatapi.viber.com/pa/set_webhook",
//       {
//         url: "",
//       },
//       getAxiosConfig()
//     );
//     console.log(data.data);
//     res.status(200).send(data.data);
//   } catch (error) {
//     console.log("error = ", error);
//     res.status(400).send(error);
//   }
// });

// const PORT = process.env.PORT || 3005;
// console.log(app.get("env"));
// app.listen(PORT, () => {
//   setApp(app);

//   console.log(`Example app listening on port ${PORT}`);
// });
