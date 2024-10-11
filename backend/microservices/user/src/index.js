const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/schema");

mongoose
  .connect("mongodb://localhost:27017/volunteeringDB")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server running");
});
