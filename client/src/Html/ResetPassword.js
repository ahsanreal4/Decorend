import React from "react";

export default function ResetPassword() {
  return (
    <div style={{ marginLeft: "450px", marginTop: "100px" }}>
      <form>
        {" "}
        <h1>Reset Password</h1>
        Password<div></div>
        <input type="password" />
        <div></div>
        Confirm Password
        <div></div>
        <input type="password" />
        <div></div>
        <input type="submit" />
      </form>
    </div>
  );
}
