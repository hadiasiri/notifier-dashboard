const express = require("express");
const router = express.Router();
const AppModel = require("../models/App");

router.post("/", async (req, res) => {
  try {
    const { _id } = req.body;

    //Check for permissions
    // @ts-ignore
    if (!(req.user && req.user._id)) {
      return res.json({
        status: false,
        errors: ["ليس لديك صلاحية حذف التطبيقات ، يرجي تسجيل الدخول أولا"],
      });
    }

    //Validate _id
    if (!(await AppModel.findById(_id))) {
      return res.json({
        status: false,
        errors: ["هذا التطبيق غير مسجل في قاعدة البيانات"],
      });
    }

    //Delete the app
    const appDelete = await AppModel.deleteOne({ _id });

    if (appDelete.deletedCount != 1) {
      return res.json({
        status: false,
        errors: ["حدث خطأ غير معروف أثناء حذف التطبيق"],
      });
    } else {
      return res.json({ status: true, messages: ["تم حذف التطبيق بنجاح"] });
    }
  } catch (e) {
    console.log(`Error in /removeApp, error: ${e.message}`, e);
    res.json({ status: false, errors: [e.message] });
  }
});

module.exports = router;
