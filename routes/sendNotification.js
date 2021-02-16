const express = require("express");
const router = express.Router();
const AppModel = require("../models/App");
const { Expo } = require("expo-server-sdk");

router.post("/", async (req, res) => {
  try {
    const { _id, title, body } = req.body;
    let errors = [];

    // @ts-ignore
    if (!(req.user && req.user._id)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية عرض التطبيقات ، يرجي تسجيل الدخول أولا"],
      });
    }

    //Validation
    if (!_id) errors.push("يجب اختيار التطبيق الذي تريد ارسال اشعارات له");
    if (!title) errors.push("يجب كتابة عنوان للإشعار");
    if (!body) errors.push("يجب كتابة محتوي الإشعار");

    if (errors.length != 0) {
      return res.json({
        status: false,
        errors,
      });
    }

    //get all push tokens
    const appSearch = await AppModel.findOne({ _id });

    if (
      !appSearch ||
      // @ts-ignore
      (appSearch.pushTokens && appSearch.pushTokens.length == 0)
    ) {
      return res.json({
        status: false,
        errors: ["لا يوجد مستخدمين لإرسال اشعارات لهم"],
      });
    }

    //Send the push notifications
    let expo = new Expo();
    let finalPushTokens = [];
    // @ts-ignore
    for (let pushToken of appSearch.pushTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        continue;
      }
      finalPushTokens.push(pushToken);
    }

    let chunks = expo.chunkPushNotifications([
      {
        // @ts-ignore
        to: finalPushTokens,
        sound: "default",
        title,
        body,
        priority: "high",
        channelId: "notifications",
        data: {},
      },
    ]);
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
    }

    return res.json({
      status: true,
      messages: [
        "جاري ارسال الإشعارات ، وقد تستغرق العميلة بعض الوقت اذا كان عدد الأجهزة كبير",
      ],
    });
  } catch (e) {
    console.log(`Error in /sendNotificaiton, error: ${e.message}`, e);
    res.json({
      status: true,
      messages: [e.message],
    });
  }
});

module.exports = router;
