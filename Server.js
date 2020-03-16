const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(express.json({ extended: false }));

app.use("/users", require("./routes/userRoute"));
app.use("/auth", require("./routes/authRoute"));
app.use("/questions", require("./routes/questionRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`running as REST on port ${PORT}`);
});
