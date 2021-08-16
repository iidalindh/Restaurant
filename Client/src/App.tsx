import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
