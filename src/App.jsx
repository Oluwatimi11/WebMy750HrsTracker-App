import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Main from "./main";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
