import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MySwal from "../AlertModel/MySwal";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const search = useLocation().search;
  const email2 = new URLSearchParams(search).get("email");

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
    <div style={{ marginLeft: "450px", marginTop: "100px" }}>
      <form onSubmit={handleResetPassword}>
        {" "}
        <h1>Reset Password</h1>
        Password<div></div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div></div>
        Confirm Password
        <div></div>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div></div>
        <input type="submit" />
      </form>
    </div>
  );
}
