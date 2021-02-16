const express = require("express");
const router = express.Router();
const AppModel = require("../models/App");

router.post("/", async (req, res) => {
  try {
    const { token, appId } = req.body;

    //Validate token
    if (!token || !token.startsWith("ExponentPushToken")) {
      return res.json({ error: "Sorry, your push token is not valid !" });
    }

    //Validate appId
    if (!(await AppModel.findById(appId))) {
      return res.json({ error: "Sorry, the app is not registerd on server !" });
    }

    //check if token already exist
    if (
      await AppModel.findOne({
        _id: appId,
        pushTokens: { $elemMatch: { $eq: token } },
      })
    ) {
      return res.sendStatus(200);
    }
    //Add the token to DB
    const saveToken = await AppModel.updateOne(
      { _id: appId },
      {
        $push: {
          pushTokens: token,
        },
      }
    );

    if (saveToken) {
      return res.sendStatus(200);
    } else {
      return res.json({
        error: "Sorry, something happend while saving your push token",
      });
    }
  } catch (e) {
    console.log(`Error in /addToken, error: ${e.message}`, e);
    res.sendStatus(500);
  }
});

module.exports = router;
