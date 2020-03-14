const express = require("express");

const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/leaders", require("./routes/leaderBoardRoute"));
app.use("/questions", require("./routes/questionRoute"));
app.use("/admin", require("./routes/adminRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running: port ${PORT}`));
