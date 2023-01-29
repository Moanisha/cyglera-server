const ChangePwdController = require("../controllers/client/ChangePwdController");
const GetUserProfileController = require("../controllers/client/GetUserProfile");

const router = require("express").Router();

//userProfile
router.get("/profile/:userId", GetUserProfileController);

//update PWd
router.put("/changePwd", ChangePwdController);

module.exports = router;
