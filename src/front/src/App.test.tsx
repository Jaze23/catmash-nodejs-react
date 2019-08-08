import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./common/config/state/Store";
import { BrowserRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
