import React, { useLayoutEffect } from 'react';
import Canvas from './Canvas';

const CanvasPage = (props) => {

    useLayoutEffect(() => import("../CSS/CanvasPage.css"));

    return (
        <div>
            <Canvas />
        </div>
  )
}
export default CanvasPage;
