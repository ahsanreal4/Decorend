import React, { useLayoutEffect } from 'react';
import Canvas from './Canvas';
import getScreenAccessible from "./ScreenHelper";

const CanvasPage = (props) => {

    useLayoutEffect(() => {
        if (!getScreenAccessible("CanvasPage")) {
            window.location.href = "/login";
        }
        import("../CSS/CanvasPage.css");
    });

    return (
        <div>
            <Canvas />
        </div>
  )
}
export default CanvasPage;
