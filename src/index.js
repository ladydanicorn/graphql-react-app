import React from "react";
import ReactDOM from "react-dom/client";
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  HttpLink 
} from "@apollo/client";
import App from "./App";

// Create Apollo Client for Countries API
const httpLink = new HttpLink({
  uri: "https://countries.trevorblades.com/",
  headers: {
    'Content-Type': 'application/json',
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);