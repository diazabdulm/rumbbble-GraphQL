import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const link = createHttpLink({ uri: "/graphql" });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          }
        }
      }
    }
  }
});

const client = new ApolloClient({ cache, link });

function Root({ children }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>{children}</BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
