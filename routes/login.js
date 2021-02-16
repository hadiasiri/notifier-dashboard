const express = require("express");
const router = express.Router();
const { createToken } = require("../helpers/jwt");
const UserModel = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    //Validation
    if (!username || !password) {
      return res.json({
        status: false,
        errors: ["يجب كتابة اسم المستخدم وكلمة المرور"],
      });
    }

    const userSearch = await UserModel.findOne({ username, password });

    if (!userSearch) {
      return res.json({
        status: false,
        errors: ["اسم المستخدم غير موجود أو كلمة المرور خطأ"],
      });
    }
    /********************************************************/

    //Send the jwt token with the success response
    const accessToken = await createToken({ _id: userSearch._id });

    res.cookie("access_token", accessToken, { maxAge: 86400 * 1000 });
    return res.json({
      status: true,
      messages: ["تم تسجيل الدخول بنجاح"],
    });

    /********************************************************/
  } catch (e) {
    console.log(`Error in /login, error: ${e.message}`, e);
    res.json({
      status: false,
      errors: [e.message],
    });
  }
});

module.exports = router;
