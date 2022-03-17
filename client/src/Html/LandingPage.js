import React from "react";
import UploadWidget from "./UploadWidget";
export default function LandingPage() {
  return (
    <div>
      <button onClick={() => (window.location.href = "/login")}>Login</button>
      <button onClick={() => (window.location.href = "/signup")}>SignUp</button>
      <UploadWidget />
    </div>
  );
}
