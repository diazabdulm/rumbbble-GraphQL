import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const link = createHttpLink({ uri: "/graphql" });
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
