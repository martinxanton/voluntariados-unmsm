import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache()
});


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </BrowserRouter>
    
  </StrictMode>
);
