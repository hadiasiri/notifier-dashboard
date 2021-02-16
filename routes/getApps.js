const express = require("express");
const router = express.Router();
const AppModel = require("../models/App");

router.post("/", async (req, res) => {
  try {
    //Check for permissions
    // @ts-ignore
    if (!(req.user && req.user._id)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية عرض التطبيقات ، يرجي تسجيل الدخول أولا"],
      });
    }

    //Get all apps from DB
    const appsSearch = await AppModel.find({});

    if (appsSearch.length == 0) {
      return res.json({
        status: false,
        errors: ["لا يوجد تطبيقات لعرضها ، يمكنك اضافة تطبيقات جديدة"],
      });
    } else {
      return res.json({
        status: true,
        apps: appsSearch,
      });
    }
  } catch (e) {
    console.log(`Error in /getApps, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
