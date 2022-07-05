import React, { useEffect, useLayoutEffect, useState } from "react";
import Cookies from "universal-cookie";
import MySwal from "../AlertModel/MySwal";
import getScreenAccessible from "./ScreenHelper";

const cookies = new Cookies();

export default function Login() {

  useLayoutEffect(() => {
    if (!getScreenAccessible("Login")) {
      window.location.href = "/";
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  async function onSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      let json2 = JSON.stringify({ email, password });

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        MySwal("success", "Logged In!", 1500);
        const user2 = data.data;
        let item = {"email":data.data.email, "name": data.data.name,"userType":data.data.userType,"id":data.data._id};
        localStorage.setItem("userData", JSON.stringify(item));
        if (data?.token != undefined && data.token != null) {
          cookies.set("token", data.token);
        }
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        MySwal("error", "Invalid Credentials!", 1500);
      }
    }
  }

  useEffect(() => {
    import("../CSS/Login.css");
    setTimeout(() => setLoading(false), 100);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div>
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form onSubmit={onSubmit}>
          <div className="field">
            <input
              autoComplete="off"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              autoComplete="off"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label>Password</label>
          </div>
          <div className="content">
            <div className="checkbox" style={{"visibility":"hidden"}}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="pass-link">
              <a href="/ForgetPassword">Forgot password?</a>
            </div>
          </div>
          <div className="field">
            <input type="submit" defaultValue="Login" />
          </div>
          <div className="signup-link">
            Not a member? <a href="/signup">Signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
}
