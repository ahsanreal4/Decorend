import React from "react";
import "./App.css";
import SignUp from "./Html/SignUp";
import Login from "./Html/Login";
import ForgetPassword from "./Html/ForgetPassword";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LandingPage from "./Html/LandingPage";
import EventManager from "./Html/EventManager";
import Seller from "./Html/Seller";
import Client from "./Html/Client";

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/"><LandingPage /></Route>
          <Route exact path="/signup"><SignUp /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/EventManager"><EventManager /></Route>
          <Route exact path="/Seller"><Seller /></Route>
          <Route exact path="/Client"><Client /></Route>
          <Route exact path="/ForgetPassword"><ForgetPassword /></Route>
        </Switch>
      </div>
    </Router>
  );

}

export default App;
