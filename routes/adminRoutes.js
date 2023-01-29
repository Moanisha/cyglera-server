const GetUserProfileController = require("../controllers/client/GetUserProfile");

const router = require("express").Router();

//user profile
router.get("/profile/:userId", GetUserProfileController);

module.exports = router;
