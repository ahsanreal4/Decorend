const mongoose = require("mongoose");

function connectDB() {
  const MONGODB_URI =
    "mongodb+srv://ahsan123:ahsan123@contactkeeper.ouoqz.mongodb.net/Decorend?retryWrites=true&w=majority";

  //Database Connection
  try {
    mongoose.connect(
      MONGODB_URI || "mongodb://localhost:27017/Decorend",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("Database Connected")
    );
  } catch (error) {
    console.log("Database connection failure");
  }
}

module.exports = connectDB;
