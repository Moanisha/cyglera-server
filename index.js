const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors({ origin: "*" }));

//dbIntegrationFunction
const connectDbFunc = require("./db/connectDb");

//authCheck is to verify jwtToken and a userObj (object) in request Object and next()
const authCheck = require("./middleware/authCheck");

//adminCheck and canteenCheck checks the role(admin/dietician/trainer) in req.userObj
const adminCheck = require("./middleware/adminCheck");
const dieticianCheck = require("./middleware/dieticianCheck");
const trainerCheck = require("./middleware/trainerCheck");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dieticianRoutes = require("./routes/dieticianRoutes");
const clientRoutes = require("./routes/clientRoutes");
const trainerRoutes = require("./routes/trainerRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", authCheck, adminCheck, adminRoutes);
app.use("/api/dietician", authCheck, dieticianCheck, dieticianRoutes);
app.use("/api/trainer", authCheck, trainerCheck, trainerRoutes);
app.use("/api/client", authCheck, clientRoutes);

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to App" });
});

connectDbFunc()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log(err.message, " err in index.js");
  });
