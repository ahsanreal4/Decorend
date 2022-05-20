import React, { useLayoutEffect } from "react";
import getScreenAccessible from "./ScreenHelper";

export default function EventManager() {

  useLayoutEffect(() => {
  if (!getScreenAccessible("EventManager")) {
      window.location.href = "/login";
    }
    });
  
  return (
    <div>
      <h1>EventManager</h1>
    </div>
  );
}
