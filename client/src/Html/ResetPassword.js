import React, { useEffect, useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import MySwal from "../AlertModel/MySwal";
import getScreenAccessible from "./ScreenHelper";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const search = useLocation().search;
  const email2 = new URLSearchParams(search).get("email");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
        if (!getScreenAccessible("ResetPassword")) {
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
      import("../CSS/Login.css");
      setTimeout(() => setLoading(false), 100);
    }, []);

  useEffect(() => {
    setEmail(email2);
  }, [email2]);

  async function handleResetPassword(e) {
    e.preventDefault();
    let json2 = JSON.stringify({ email, password });
    if (password === confirmPassword) {
      const response = await fetch("http://localhost:3000/api/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        MySwal("success", "Password Reset Successful!", 1500);
        setTimeout(() => (window.location.href = "/login"), 1500);
      } else {
        MySwal("error", "Some Error Occured. Try Again!", 1500);
      }
    } else {
      MySwal("error", "Passwords dont match!", 1500);
    }
  }

  return (
    <div>
      {" "}
      <div className="wrapper">
        <div className="title">Reset Password</div>
        <form onSubmit={handleResetPassword}>
          <div className="field">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <div className="field">
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>Confirm Password</label>
        </div>
        <div className="field">
          <input type="submit" />
        </div>
      </form>
    </div>
  </div>


  );
}
