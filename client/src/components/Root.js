import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const link = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link,
  uri: "/",
  cache: new InMemoryCache(),
});

function Root({ children }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>{children}</BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
