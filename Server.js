const express = require("express");
const path = require("path");
const graphql = require("graphql");
const schema = require("./graphql/schema");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const connectDB = require("./config/db");
// const path = require("path");

const app = express();
app.use(express.json({ extended: false }));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.use("/users", require("./routes/userRoute"));

connectDB();
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`GraphQL running on port ${PORT}`);
});
