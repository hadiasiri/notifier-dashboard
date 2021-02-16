require("dotenv/config");
module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "randomaccesstoken",
};
