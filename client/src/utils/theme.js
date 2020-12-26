import { createMuiTheme } from "@material-ui/core";

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

export default theme;
