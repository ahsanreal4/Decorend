import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import MySwal from "../AlertModel/MySwal";

export default function Canvas() {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    let editId = "0";
    let c = initCanvas();
    setCanvas(c);
    import("../CSS/Canvas.css");
    let urlSplit = window.location.href.split("?");
    if (urlSplit?.length > 1) {
      let idSplit = urlSplit[1].split("=");
      editId = idSplit[1];
      document.getElementById("saveButton").style.display = "none";
      document.getElementById("updateButton").style.display = "inline";
      localStorage.setItem("editId", editId);
      LoadCanvas(c);
    }
    else {
      localStorage.setItem("editId", editId);
    }
    
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
      let editId = localStorage.getItem("editId");
      if (editId == "0") { 
      let jsonString = JSON.stringify(canvi);
      var image = new Image();
      image.src = document.getElementById("canvas").toDataURL();
      const data = new FormData()
      data.append("file", document.getElementById("canvas").toDataURL());
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dnuuh99qn");
      fetch("https://api.cloudinary.com/v1_1/dnuuh99qn/image/upload", {
        method: "post",
        body: data
      })
        .then(resp => resp.json())
        .then(data => {
          let json2 = JSON.stringify({ canvas: jsonString, imageUrl: data.url });
          fetch("http://localhost:3000/api/saveCanvas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: json2,
          }).then(res => res.json()).then(data => {
            if (data.status === "ok") {
              localStorage.removeItem("editId");
              MySwal("success", "Saved!", 1500);
              setTimeout(() => window.location.href = "/canvases", 1500);
            }
          });
        })
        .catch(err => MySwal("Error", err, 1500))
      
      }
      else {
      let jsonString = JSON.stringify(canvi);
      var image = new Image();
      image.src = document.getElementById("canvas").toDataURL();
      const data = new FormData()
      data.append("file", document.getElementById("canvas").toDataURL());
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dnuuh99qn");
      fetch("https://api.cloudinary.com/v1_1/dnuuh99qn/image/upload", {
        method: "post",
        body: data
      })
        .then(resp => resp.json())
        .then(data => {
          let json2 = JSON.stringify({ id:editId,canvas: jsonString, imageUrl: data.url });
          fetch("http://localhost:3000/api/updateCanvas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: json2,
          }).then(res => res.json()).then(data => {
            if (data.status === "ok") {
              localStorage.removeItem("editId");
              MySwal("success", "Updated!", 1500);
              setTimeout(() => window.location.href = "/canvases", 1500);
            }
          });
        })
        .catch(err => MySwal("Error", err, 1500))
      }
    }
  };

  const LoadCanvas = async (canvi) => {
      const response = await fetch("http://localhost:3000/api/loadCanvas", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: localStorage.getItem("editId")})
      });
      const data = await response.json();
      if (data.status === "ok") {
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
        <button id="saveButton" onClick={() => SaveCanvas(canvas)}>Save</button>
        <button style={{"display":"none"}} id="updateButton" onClick={() => SaveCanvas(canvas)}>Update</button>
        <button onClick={() => LoadCanvas(canvas)}>Load</button>
        <button onClick={() => deleteCanvas(canvas)}>Delete</button>
        <button onClick={() => clearCanvas(canvas)}>Clear</button>
      </div>
      <div id="images">
          <img id="img1" crossOrigin="anonymous" src='https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico' draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)} />
      </div>
      <canvas id="canvas" style={{ border: "1px solid black"}} />
    </div>
  );
}
