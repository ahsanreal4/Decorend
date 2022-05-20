import React, { useLayoutEffect } from "react";
import getScreenAccessible from "./ScreenHelper";

export default function Client() {

  useLayoutEffect(() => {
  if (!getScreenAccessible("Client")) {
      window.location.href = "/login";
    }
  });

  return (
    <div>
      <h1>Client</h1>
    </div>
  );
}
