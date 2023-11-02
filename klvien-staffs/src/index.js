import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Store from "./Store/store";
import { Provider } from "react-redux";

import Root from "./root";

ReactDOM.render(
  <Provider store={Store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
