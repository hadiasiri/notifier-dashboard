const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { checkToken } = require("./helpers/jwt");
const PORT = process.env.PORT || 5000;

//init
require("./db");

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*********************************************************/

//Routes
app.use("/login", require("./routes/login"));
app.use("/addToken", require("./routes/addToken"));
app.use("/addApp", checkToken, require("./routes/addApp"));
app.use("/deleteApp", checkToken, require("./routes/deleteApp"));
app.use("/getApps", checkToken, require("./routes/getApps"));
app.use("/editApp", checkToken, require("./routes/editApp"));
app.use("/sendNotification", checkToken, require("./routes/sendNotification"));
/*********************************************************/

//For the react app
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
/*********************************************************/

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
