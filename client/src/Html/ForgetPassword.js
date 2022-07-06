import React, { useEffect,useState, useLayoutEffect } from "react";
import MySwal from "../AlertModel/MySwal";
import validator from "validator";
import getScreenAccessible from "./ScreenHelper";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
        if (!getScreenAccessible("ForgetPassword")) {
            window.location.href = "/";
        }
    }, []);

  async function forgetPassword(e) {
    e.preventDefault();
    let json2 = JSON.stringify({ email });
    if (email !== "") {
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
          setEmailSent(true);
          setResetPassword(data.code);
        } else {
          MySwal("error", "Email is not registered!", 1500);
        }
      } else {
        MySwal("error", "Email does not exist!", 1500);
      }
    }
  }

  function handleReset(e) {
    e.preventDefault();
    if (resetPassword === currentPassword) {
      MySwal("success", "Code Verified!", 1500);
      setTimeout(
        () => (window.location.href = "/resetPassword?email=" + email),
        1500
      );
    } else {
      MySwal("error", "Code Incorrect!", 1500);
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
   <>
      {emailSent ? (
        <div>
          <div className="wrapper">
            <div className="title">Reset Password</div>
            <form onSubmit={handleReset}>
              <div className="field">
              <input
                  type="text"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <label>Code</label>
              </div>
              <br />
              <div className="field">
              <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <div className="wrapper">
            <div className="title">Forget Password</div>
            <form onSubmit={forgetPassword}>
              <div className="field">
              <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email Address</label>
              </div>
              <br />
              <div className="field">
              <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
