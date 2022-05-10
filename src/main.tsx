// import React from "react";
// interceptor({}, () => store);
// import interceptor from "./configs/interceptor";

import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "./configs/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

console.log("System Environment: ", import.meta.env);
console.log("Check Type Dev: ", import.meta.env.DEV);
console.log("Check Type Mode: ", import.meta.env.MODE);
console.log("Check Type Prod: ", import.meta.env.PROD);

const { store, persistor } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
