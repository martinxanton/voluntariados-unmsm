require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
connectDB();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
