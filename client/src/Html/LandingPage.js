import React from "react";
import Navbar from "./Navbar/Navbar";
import UploadWidget from "./UploadWidget";

export default function LandingPage() {
  
  return (
    <div>
      <Navbar />
      <button onClick={() => (window.location.href = "/login")}>Login</button>
      <button onClick={() => (window.location.href = "/signup")}>SignUp</button>
      <button onClick={() => (window.location.href = "/canvasPage")}>Canvas</button>
      <UploadWidget />
    </div>
  );
}
