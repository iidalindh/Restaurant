import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/login/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
