import React from "react";
import ReactDOM from "react-dom";

import Root from "components/Root";
import App from "components/App";

ReactDOM.render(
  <React.StrictMode>
    <Root>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
);
