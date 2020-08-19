import React from "react";
import Routes from "./routes";
import { StylesProvider } from "@material-ui/core/styles";

import "./global.css";

function App() {
  return (
    <StylesProvider injectFirst>
      <Routes></Routes>
    </StylesProvider>
  );
}

export default App;
