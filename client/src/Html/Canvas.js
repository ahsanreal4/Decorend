import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

export default function Canvas() {
  const [canvas, setCanvas] = useState(null);
  useEffect(() => {
    let c = initCanvas();
    setCanvas(c);
  }, []);

  const initCanvas = () => {
    let obj = new fabric.Canvas("canvas", {
      height: 500,
      width: 700,
      backgroundColor: "grey",
    });
    return obj;
  };

  const addRect = (canvi) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      fill: "blue",
    });
    canvi.add(rect);
    canvi.renderAll();
  };

  const addCircle = (canvi) => {
    const circle = new fabric.Circle({
      radius: 30,
      fill: "blue",
    });
    canvi.add(circle);
    canvi.renderAll();
  };

  const addLine = (canvi) => {
    let line = new fabric.Line([50, 100, 200, 200], {
      left: 170,
      top: 150,
      stroke: "blue",
    });

    canvi.add(line);
    canvi.renderAll();
  };

  return (
    <div>
      <h1>Fabric.js on React - fabric.Canvas('...')</h1>
      <button onClick={() => addRect(canvas)}>Add Rect</button>
      <button onClick={() => addCircle(canvas)}>Add Circle</button>
      <button onClick={() => addLine(canvas)}>Add Line</button>
      <canvas id="canvas" />
    </div>
  );
}
