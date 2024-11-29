require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/schema"); // Ahora es compatible con gql
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
  try {
    // Conecta la base de datos
    await connectDB();

    // Crea el servidor Apollo con Federation
    const server = new ApolloServer({
      schema: buildSubgraphSchema({ typeDefs, resolvers }),
    });

    // Arranca el servidor
    const { url } = await server.listen(process.env.PORT || 4000);
    console.log(`Servidor federado corriendo en ${url}`);
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
  }
};

// Ejecuta la función de inicio
startServer();
