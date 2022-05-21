import React, { useLayoutEffect, useState } from 'react';
import Canvas from './Canvas';
import getScreenAccessible from "./ScreenHelper";

const CanvasPage = (props) => {
    let [screenLoading, setScreenLoading] = useState(false);

    useLayoutEffect(() => {
        if (!getScreenAccessible("CanvasPage")) {
            window.location.href = "/login";
        }
        import("../CSS/CanvasPage.css");
        setScreenLoading(true);
    });

    return (
        screenLoading == true &&
        (<div>
            <Canvas />
        </div>)
  )
}
export default CanvasPage;
