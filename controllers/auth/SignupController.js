const UsersCollection = require("../../models/Users");
const { encryptPwd } = require("../../util/cryptFunc");

const SignupController = async (req, res) => {
  const { email, password, name, userRole } = req.body;
  try {
    const userFound = await UsersCollection.findOne({ email });
    if (userFound) {
      return res
        .status(400)
        .send({ type: "error", msg: "No duplicate entity allowed" });
    }
    //now hash pwd
    const hashedPwd = await encryptPwd(password);
    //now save to DB
    const createUser = await UsersCollection.create({
      name,
      email,
      password: hashedPwd,
      userRole,
    });
    if (!createUser || createUser.length < 1) {
      return res
        .status(401)
        .send({ type: "error", msg: "Couldn't create User" });
    }

    res.send({ msg: "User created Successfully", type: "success" });
  } catch (err) {
    res.status(500).send({ msg: err.message, type: "error" });
  }
};

module.exports = SignupController;
