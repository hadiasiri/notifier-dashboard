const express = require("express");
const router = express.Router();
const AppModel = require("../models/App");

router.post("/", async (req, res) => {
  try {
    const { _id, name } = req.body;

    //Check for permissions
    // @ts-ignore
    if (!(req.user && req.user._id)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية تعديل التطبيقات ، يرجي تسجيل الدخول أولا"],
      });
    }

    //Validate name
    if (!name) {
      return res.json({
        status: false,
        errors: ["يجب كتابة اسم التطبيق لكي تتمكن من تعديله"],
      });
    }

    //check if name already exist
    if (await AppModel.findOne({ _id: { $ne: _id }, name })) {
      return res.json({
        status: false,
        errors: ["يوجد تطبيق بهذا الاسم بالفعل"],
      });
    }

    //Add the app to DB
    const saveApp = await AppModel.updateOne({ _id }, { $set: { name } });

    const appSearch = await AppModel.findOne({ _id });
    if (saveApp.modifiedCount != 0) {
      return res.json({
        status: true,
        messages: ["تم تعديل التطبيق بنجاح"],
        app: appSearch,
      });
    } else {
      return res.json({
        status: false,
        errors: ["لم تقم بأي تعديل لحفظه"],
      });
    }
  } catch (e) {
    console.log(`Error in /editApp, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
