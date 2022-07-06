import React from "react";
import { useEffect, useLayoutEffect, useState } from "react"

export default function Navbar() {
    let [loaded,setLoaded] = useState(true);
    let [userLoggedIn, setUserLoggedIn] = useState(true);
    let [name, setName] = useState("");
    let [userType, setUserType] = useState("");

    useLayoutEffect(() => {
        import("../../CSS/Navbar.css");
        var data = JSON.parse(localStorage.getItem("userData"));
        if (data == null) {
            setUserLoggedIn(false);
        }
        else {
            setName(data.name.split(" ")[0]);
            setUserType(data.userType);
        }
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
    
    const logout = () => {
        if (loaded == true) {
            localStorage.removeItem("userData");
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    }

    return (
        loaded == true && (
            <nav className="navbar navbar-expand-lg navbar-mainbg">
            {/* Logo */}
            <a className="navbar-brand navbar-logo" href="/">Decorend</a>
            {/* Collapse Button */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white" />
            </button>
            {/* Links */}
            <div className="collapse navbar-collapse  parent" id="navbarSupportedContent">
                <div className="navchild">
                <ul className="navbar-nav">
                    {/* Nav Links */}
                    <li className="nav-item">
                    <a className="nav-link" href="/#">
                        <i className="fas fa-tachometer-alt">
                        </i>Dashboard
                    </a>
                    </li>
                    <li className="nav-item ">
                                
                                {userLoggedIn == true && userType == "user" &&
                                    <a className="nav-link" href="/products">
                                        <i className="far fa-star-half">
                                        </i>Products
                                    </a>
                                }
                                {userLoggedIn == false && (<a className="nav-link" href="/#service">
                        <i className="far fa-star-half">
                        </i>Services
                          </a>)}

                    </li>
                    <li className="nav-item ">
                                {userLoggedIn == true && userType == "user" ?
                                    <a className="nav-link" href="/events"> 
                                        <i className="fas fa-calendar-check" />
                                        Events
                                    </a>
                                : 
                                    <a className="nav-link" href="/#pics"> 
                                        <i className="fas fa-calendar-check" />
                                        Event
                                    </a>
                                } 

                    </li>
                    <li className="nav-item ">
                                {userLoggedIn == true && (
                                    <a className="nav-link" href="/messaging"> 
                                       <i className="fa-regular fa-message"></i>
                                        Messaging
                                    </a>
                                )}

                    </li>
                    <li className="nav-item">
                                {userLoggedIn == true && userType == "user" && <a className="nav-link" href="/canvases">
                                    <i className="fas fa-palette"></i>
                                    Customized Designs
                                </a>
                                }
                    { userLoggedIn == false && <a className="nav-link" href="/#contact">
                        <i className="far fa-address-book">
                        </i>Contact Us
                    </a>}

                     
                            </li>
                        {userLoggedIn == true && userType == "user" && (<li className="nav-item">
                        <a className="nav-link" href="/orders">
                        <i className="fas fa-cart-arrow-down"></i>
                        Orders
                        </a>         
                            </li>)}
                            {userLoggedIn == true && userType != "user" && (<li className="nav-item">
                                <a className="nav-link" href="/sellerOrders">
                        <i className="fas fa-cart-arrow-down"></i>
                        Orders
                        </a>         
                            </li>)}
                </ul>
                </div>
                <div className="navchild1">
                    <div className="navbar-nav  navright">
                    {userLoggedIn == false ? (<button onClick={() => login()}><i>Login</i></button>) : (<button onClick={() => window.location.href = "/profile"}><i>{ name }</i></button>)}                  
                    {userLoggedIn == false ?   (<button onClick={() => SignUp()} className="simple"><i>Signup</i></button>) : (<button onClick={(() => logout())} className="simple"><i className="fas fa-sign-out-alt"></i></button>)}
                </div>
                </div>
            </div>
            </nav>)

  )
}
