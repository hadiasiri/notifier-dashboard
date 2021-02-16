const express = require("express");
const router = express.Router();
const AppModel = require("../models/App");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    //Check for permissions
    // @ts-ignore
    if (!(req.user && req.user._id)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية اضافة التطبيقات ، يرجي تسجيل الدخول أولا"],
      });
    }

    //Validate name
    if (!name) {
      return res.json({
        status: false,
        errors: ["يجب كتابة اسم التطبيق لكي تتمكن من اضافته"],
      });
    }

    //check if name already exist
    if (await AppModel.findOne({ name })) {
      return res.json({
        status: false,
        errors: ["هذا التطبيق موجود من قبل"],
      });
    }

    //Add the app to DB
    const saveApp = await AppModel.create({ name });

    if (saveApp) {
      return res.json({
        status: true,
        messages: ["تم اضافة التطبيق بنجاح"],
        app: saveApp,
      });
    } else {
      return res.json({
        status: false,
        errors: ["حدثت مشكلة أثناء اضافة التطبيق"],
      });
    }
  } catch (e) {
    console.log(`Error in /addApp, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
