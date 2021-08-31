import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { LandingPage } from "./components/landingPage/LandingPage";

import { Booking } from "./components/booking/Booking";
import { BookingDetails } from "./components/booking/BookingDetails";

import axios from "axios";
import { AuthContext } from "./context/AuthContext";

axios.defaults.withCredentials = true;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  async function getLoggedIn() {
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/booking-details">
            {/* <BookingDetails
            date={bookingValue.date}
            time={bookingValue.time}
            numberOfGuests={bookingValue.numberOfGuests}
            customerEmail={bookingValue.customerEmail}
            customerName={bookingValue.customerName}
          /> */}
          </Route>

          {role === "admin" ? (
            <Route path="/admin"></Route>
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
