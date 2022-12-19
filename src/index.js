import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BoardStore } from "./store/BoardStore";
import { Provider } from "mobx-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthStore } from "./store/AuthStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const boardStore = new BoardStore();
const authStore= new AuthStore()

const store = {
  boardStore,
  authStore,
};

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={
          <Provider {...store}>
            <App />
          </Provider>
        }
      />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
