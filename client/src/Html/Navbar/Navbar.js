import React from "react";
import { useEffect, useLayoutEffect } from "react"

export default function Navbar() {
    let loaded = false;

    useLayoutEffect(() => {
        import("../../CSS/Navbar.css");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            import("../Navbar/navbarscript");
            loaded = true;
        }, 400);
    }, []);

    const login = () => {
        if (loaded == true) {
            window.location.href = "http://localhost:3000/login";
        }
        }

    const SignUp = () => {
        if (loaded == true) {
            window.location.href = "http://localhost:3000/signup";
        }
        }

    return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
            {/* Logo */}
            <a className="navbar-brand navbar-logo" href="#">Decorend</a>
            {/* Collapse Button */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white" />
            </button>
            {/* Links */}
            <div className="collapse navbar-collapse  parent" id="navbarSupportedContent">
                <div className="navchild">
                <ul className="navbar-nav">
                    {/* For Styling */}
                    <div className="hori-selector">
                    <div className="left" />
                    <div className="right" />
                    </div>
                    {/* Nav Links */}
                    <li className="nav-item active">
                    <a className="nav-link" href="#">
                        <i className="fas fa-tachometer-alt">
                        </i>Dashboard
                    </a>
                    </li>
                    <li className="nav-item ">
                    <a className="nav-link" href="#service">
                        <i className="far fa-star-half">
                        </i>Services
                    </a>
                    </li>
                    <li className="nav-item ">
                    <a className="nav-link" href="#pics"> 
                        <i className="fas fa-calendar-check" />
                        Event
                    </a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#contact">
                        <i className="far fa-address-book">
                        </i>Contact Us
                    </a>
                    </li>
                </ul>
                </div>
                <div className="navchild1">
                <div className="navbar-nav  navright">
                    <button onClick={() => login()}><i>Login</i></button>
                      <button onClick={() => SignUp()} className="simple"><i>Signup</i></button>
                </div>
                </div>
            </div>
            </nav>
  )
}
