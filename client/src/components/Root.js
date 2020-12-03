import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const link = createHttpLink({ uri: "/graphql" });

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({ cache, link });

const theme = createMuiTheme({
  spacing: (factor) => `${factor}rem`,
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          fontSize: "62.5%",
        },
      },
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function Root({ children }) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
