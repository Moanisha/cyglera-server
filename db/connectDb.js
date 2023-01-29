const mongoose = require("mongoose");

const connectDbFunc = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (err) {
    console.log(err.message, " err in connectDbFunc");
  }
};

module.exports = connectDbFunc;
