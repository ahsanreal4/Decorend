import React from "react";
import "./App.css";
import SignUp from "./Html/SignUp";
import Login from "./Html/Login";
import ForgetPassword from "./Html/ForgetPassword";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./Html/LandingPage";
import EventManager from "./Html/EventManager";
import Seller from "./Html/Seller";
import Client from "./Html/Client";
import ResetPassword from "./Html/ResetPassword";
import CanvasPage from "./Html/CanvasPage";
import About from "./Html/About";
import Products from "./Html/Product/Products";
import Product from "./Html/Product/Product";
import Payment from "./Html/Payment";
import PaymentSuccessful from "./Html/PaymentSuccessful";
import Canvases from "./Html/Canvases";
import Events from "./Html/Product/Events";
import Profile from "./Html/Profile";
import ShippingAddress from "./Html/ShippingAddress";
import MainPage from "./Html/Chat/MainPage";
import Order from "./Html/Order/Order";
import SellerOrder from "./Html/Order/SellerOrder";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/EventManager">
            <EventManager />
          </Route>
          <Route exact path="/Seller">
            <Seller />
          </Route>
          <Route exact path="/Client">
            <Client />
          </Route>
          <Route exact path="/ForgetPassword">
            <ForgetPassword />
          </Route>
          <Route exact path="/resetPassword">
            <ResetPassword />
          </Route>
          <Route exact path="/canvasPage">
            <CanvasPage />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/product">
            <Product />
          </Route>
          <Route exact path="/payment">
            <Payment />
          </Route>
          <Route exact path="/paymentSuccessful">
            <PaymentSuccessful />
          </Route>
          <Route exact path="/canvases">
            <Canvases />
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/shippingAddress">
            <ShippingAddress />
          </Route>
          <Route exact path="/messaging">
            <MainPage />
          </Route>
          <Route exact path="/orders">
            <Order />
          </Route>
          <Route exact path="/sellerOrders">
            <SellerOrder />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
