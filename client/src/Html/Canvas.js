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
      backgroundColor: "white",
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
    let line = new fabric.Line([50, 100, 50, 200], {
      left: 170,
      top: 150,
      stroke: "blue",
    });

    canvi.add(line);
    canvi.renderAll();
  };

  const addImage = (canvi) => {
    let imgElement = document.getElementById("my-image");
    let imgInstance = new fabric.Image(imgElement, {
      left: 270,
      top: 200,
      angle: 0,
      opacity: 0.75,
      width: 300,
      height: 300,
    });
    canvi.add(imgInstance);
    canvi.renderAll();
  };

  const SaveCanvas = (canvi) => {
    let json = JSON.stringify(canvi);
  };

  const LoadCanvas = (canvi) => {
    let json = {
      version: "5.2.1",
      objects: [
        {
          type: "rect",
          version: "5.2.1",
          originX: "left",
          originY: "top",
          left: 207,
          top: 69,
          width: 200,
          height: 280,
          fill: "blue",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          rx: 0,
          ry: 0,
        },
        {
          type: "circle",
          version: "5.2.1",
          originX: "left",
          originY: "top",
          left: 0,
          top: 0,
          width: 60,
          height: 60,
          fill: "blue",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          radius: 30,
          startAngle: 0,
          endAngle: 360,
        },
        {
          type: "circle",
          version: "5.2.1",
          originX: "left",
          originY: "top",
          left: -3,
          top: 141,
          width: 60,
          height: 60,
          fill: "blue",
          stroke: null,
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          radius: 30,
          startAngle: 0,
          endAngle: 360,
        },
        {
          type: "line",
          version: "5.2.1",
          originX: "left",
          originY: "top",
          left: 170,
          top: 150,
          width: 150,
          height: 100,
          fill: "rgb(0,0,0)",
          stroke: "blue",
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          x1: -75,
          x2: 75,
          y1: -50,
          y2: 50,
        },
        {
          type: "line",
          version: "5.2.1",
          originX: "left",
          originY: "top",
          left: 114,
          top: 43,
          width: 150,
          height: 100,
          fill: "rgb(0,0,0)",
          stroke: "blue",
          strokeWidth: 1,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 1,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          x1: -75,
          x2: 75,
          y1: -50,
          y2: 50,
        },
        {
          type: "image",
          version: "5.2.1",
          originX: "left",
          originY: "top",
          left: 513,
          top: 46,
          width: 300,
          height: 300,
          fill: "rgb(0,0,0)",
          stroke: null,
          strokeWidth: 0,
          strokeDashArray: null,
          strokeLineCap: "butt",
          strokeDashOffset: 0,
          strokeLineJoin: "miter",
          strokeUniform: false,
          strokeMiterLimit: 4,
          scaleX: 1,
          scaleY: 1,
          angle: 0,
          flipX: false,
          flipY: false,
          opacity: 0.75,
          shadow: null,
          visible: true,
          backgroundColor: "",
          fillRule: "nonzero",
          paintFirst: "fill",
          globalCompositeOperation: "source-over",
          skewX: 0,
          skewY: 0,
          cropX: 0,
          cropY: 0,
          src: "https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico",
          crossOrigin: null,
          filters: [],
        },
      ],
      background: "white",
    };
    canvi.loadFromJSON(json);
  };

  return (
    <div style={{ marginLeft: "150px", marginBottom: "50px" }}>
      <img
        src="https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico"
        id="my-image"
        style={{ display: "none" }}
      />
      <button onClick={() => addRect(canvas)}>Add Rect</button>
      <button onClick={() => addCircle(canvas)}>Add Circle</button>
      <button onClick={() => addLine(canvas)}>Add Line</button>
      <button onClick={() => addImage(canvas)}>Add Image</button>
      <button onClick={() => SaveCanvas(canvas)}>Save</button>
      <button onClick={() => LoadCanvas(canvas)}>Load</button>
      <button onClick={() => canvas.clear()}>Clear</button>
      <canvas id="canvas" style={{ border: "1px solid black" }} />
    </div>
  );
}
