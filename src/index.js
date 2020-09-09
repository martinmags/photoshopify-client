require("dotenv").config();
import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import "./index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
  uri: process.env.SERVER_URI || "http://localhost:4000/graphql",
});
const authLink = setContext((req, res) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
