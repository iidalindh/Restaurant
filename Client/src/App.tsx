import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { LandingPage } from "./components/landingPage/LandingPage";
import { Menu } from "./components/Menu";
import { Booking } from "./components/booking/Booking";
import { BookingDetails } from "./components/booking/BookingDetails";

import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { Admin } from './components/admin/Admin';
import { CancelBooking } from "./components/booking/CancelBooking";

axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");

    const getLoggedIn = async () => {
    const loggedInRes = await axios.get("http://localhost:8000/loggedIn");
    setLoggedIn(loggedInRes.data.loggedIn);
    setRole(loggedInRes.data.role);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, role, getLoggedIn }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/booking/cancel/:id">
            <CancelBooking />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          {loggedIn === false && (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}


          {role === "admin" ? (
                        <Route path="/admin" component={Admin}/>
                    ) : (
                        <>
                            <p>You don't have access to this page</p>
                            <Link to="/">Go to homepage</Link>
                        </>
                        

                    )}

        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
