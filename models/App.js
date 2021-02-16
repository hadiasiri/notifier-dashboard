const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const AppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  pushTokens: {
    type: [String],
    default: [],
  },
});


AppSchema.plugin(autoIncreament.plugin, { model: "App", startAt: 1 });

module.exports = mongoose.model("App", AppSchema, "apps");
