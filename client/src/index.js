import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Root from "components/Root";
import App from "components/App";

ReactDOM.render(
  <StrictMode>
    <Root>
      <App />
    </Root>
  </StrictMode>,
  document.getElementById("root")
);
