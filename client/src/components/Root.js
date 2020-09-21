import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client"
import { BrowserRouter } from "react-router-dom";

const link = createUploadLink({ uri: "/graphql" });
const cache = new InMemoryCache();

const client = new ApolloClient({ cache, link });

function Root({ children }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>{children}</BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
