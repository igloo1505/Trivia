const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: false,
      autoIndex: false,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log("Trivia Database Connected"));
};

module.exports = connectDB;
