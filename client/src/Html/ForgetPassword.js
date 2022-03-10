import React, { useState } from "react";
import MySwal from "../AlertModel/MySwal";
import validator from "validator";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  async function forgetPassword(e) {
    e.preventDefault();
    let json2 = JSON.stringify({ email });

    if (validator.isEmail(email)) {
      const response = await fetch("http://localhost:3000/api/emailExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        MySwal("success", "Reset Mail sent successfully!", 1500);
        // setTimeout(() => {
        //   window.location.href = "/resetPassword";
        // }, 1500);
        setEmailSent(true);
        setResetPassword(data.code);
      } else {
        MySwal("error", "Email is not registerd!", 1500);
      }
    } else {
      MySwal("error", "Email does not exist", 1500);
    }
  }

  function handleReset(e) {
    e.preventDefault();
    if (resetPassword === currentPassword) {
      MySwal("success", "Code Verified!", 1500);
      setTimeout(() => (window.location.href = "/resetPassword"), 1500);
    } else {
      MySwal("error", "Code Incorrect!", 1500);
    }
  }
  return (
    <div
      style={{ marginLeft: "450px", marginTop: "100px" }}
      className="container"
    >
      {emailSent ? (
        <>
          <form onSubmit={handleReset}>
            <h1>Reset Password</h1>
            <input
              type="text"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <div></div>
            <input type="submit" />
          </form>
        </>
      ) : (
        <>
          {" "}
          <h1>Forget Password</h1>
          <form onSubmit={forgetPassword}>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <div></div>
            <input type="submit" />
          </form>
        </>
      )}
    </div>
  );
}
