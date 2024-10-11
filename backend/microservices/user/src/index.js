require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./graphql/shema");
const resolvers = require("./graphql/resolvers");

const app = express();

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () =>
  console.log("Servidor corriendo en el puerto 4000")
);
