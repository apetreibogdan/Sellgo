import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import store from "./redux/store";

import { Provider } from "react-redux";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/index.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";

import App from "./App";

document.title = "Sellgo.";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
