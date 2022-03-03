import React from "react";
import "./App.css";
import SignUp from "./Html/SignUp";
import Login from "./Html/Login";
import ForgetPassword from "./Html/ForgetPassword";
import LoggedIn from "./Html/LoggedIn";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/signup"><SignUp /></Route>
          <Route exact path="/"><Login /></Route>
          <Route exact path="/LoggedIn"><LoggedIn /></Route>
          <Route exact path="/ForgetPassword"><ForgetPassword /></Route>
        </Switch>
      </div>
    </Router>
  );

}

export default App;
