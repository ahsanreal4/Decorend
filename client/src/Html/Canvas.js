import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import MySwal from "../AlertModel/MySwal";

export default function Canvas() {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    let c = initCanvas();
    setCanvas(c);
    import("../CSS/Canvas.css");
  }, []);

  const initCanvas = () => {
    let obj = new fabric.Canvas("canvas", {
      height: 500,
      width: 700,
      backgroundColor: "white",
    });
    obj.on('mouse:up', function(options) {
      console.log(options.e.clientX, options.e.clientY);
    });
    obj.preserveObjectStacking = true;
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
      fill: "green",
    });
    canvi.add(circle);
    canvi.renderAll();
  };

  const addLine = (canvi) => {
    let line = new fabric.Line([50, 100, 50, 200], {
      left: 170,
      top: 150,
      stroke: "red",
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
      width: imgElement.width,
      height: imgElement.height,
    });
    canvi.add(imgInstance);
    canvi.renderAll();
  };

  const SaveCanvas = async (canvi) => {
    if (canvi._objects.length !== 0) {
      let jsonString = JSON.stringify(canvi);
      let json2 = JSON.stringify({ canvas: jsonString });
      const response = await fetch("http://localhost:3000/api/saveCanvas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json2,
      });
      const data = await response.json();
      if (data.status === "ok") {
        MySwal("success", "Saved!", 1000);
      }
    }
  };

  const LoadCanvas = async (canvi) => {
      const response = await fetch("http://localhost:3000/api/loadCanvas", {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      if (data.status === "ok") {
          console.log(data);
          let json = JSON.parse(data.data.canvas);
          canvi.loadFromJSON(json);
      }
  };

  const clearCanvas = (canvi) => {
    canvi.clear();
    let c = initCanvas();
    setCanvas(c);
  };

  const deleteCanvas = (canvi) => {
    canvi.remove(canvi.getActiveObject());
  };

  const onDragEndImage = (e, canvi) => {
    let imgElement = document.getElementById(e.target.id);
    let imgInstance = new fabric.Image(imgElement, {
      left: e.clientX/2.5,
      top: e.clientY,
      angle: 0,
      opacity: 1,
      width: imgElement.width,
      height: imgElement.height,
    });
    canvi.add(imgInstance);
    canvi.renderAll();
  };

  return (
    <div>
      <img
        src="https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico"
        id="my-image"
        style={{ display: "none" }}
      />
      <div id="buttons">
        <button onClick={() => addRect(canvas)}>Add Rect</button>
        <button onClick={() => addCircle(canvas)}>Add Circle</button>
        <button onClick={() => addLine(canvas)}>Add Line</button>
        <button onClick={() => addImage(canvas)}>Add Image</button>
        <button onClick={() => SaveCanvas(canvas)}>Save</button>
        <button onClick={() => LoadCanvas(canvas)}>Load</button>
        <button onClick={() => deleteCanvas(canvas)}>Delete</button>
        <button onClick={() => clearCanvas(canvas)}>Clear</button>
      </div>
      <div id="images">
          <img id="img1" src='https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico' draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)} />
      </div>
      <canvas id="canvas" style={{ border: "1px solid black"}} />
    </div>
  );
}
