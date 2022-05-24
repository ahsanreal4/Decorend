import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import MySwal from "../AlertModel/MySwal";
import logo from "../img/ballon/blue ballon.svg"
import logo2 from "../img/ballon/Green ballon.svg"
import logo3 from "../img/ballon/Purple ballon.svg"
import logo4 from "../img/ballon/Purple light ballon.svg"
import logo5 from "../img/ballon/Red ballon.svg"
import fballon  from "../img/golden-balloons-transparent-background/515 [Converted].svg"
import fballon2 from "../img/realistic-party-balloons-set/32627 [Converted].svg"
import fballon3 from "../img/flat-style-happy-birthday-balloons-confetti-background/SVG/merge ballons.svg"
import logo9 from "../CSS/images/canvas.jpg"

export default function Canvas() {
  const [canvas, setCanvas] = useState();
  const [inactive, setInactive] = useState(false);
  const [show, setshow] = useState(false);
  const [show01, setshow01] = useState(false);
  const [show02, setshow02] = useState(false);
  const [show1, setshow1] = useState(false);
  const [show11, setshow11] = useState(false);
  const [show12, setshow12] = useState(false);

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
    obj.on({
      'selection:updated': HandleElement,
      'selection:created': HandleElement
    });
    obj.preserveObjectStacking = true;
    return obj;
  };

  function HandleElement(obj){
    console.log(obj);
  }

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

  // const clearCanvas = (canvi) => {
  //   canvi.clear();
  //   let c = initCanvas();
  //   setCanvas(c);
  // };

  const deleteCanvas = (canvi) => {
    canvi.remove(canvi.getActiveObject());
  };

  const onDragEndImage = (e, canvi) => {
    let imgElement = document.getElementById(e.target.id);
    let srcSplit = imgElement.src.split(".");
    if (srcSplit[srcSplit.length - 1] != "svg") {
      let imgInstance = new fabric.Image(imgElement, {
        left: e.clientX / 2.5,
        top: e.clientY,
        angle: 0,
        opacity: 1,
        width: imgElement.width,
        height: imgElement.height,
      });
      canvi.add(imgInstance);
    }
    else {
      let src = imgElement.src;
      fabric.loadSVGFromURL(src,function(objects, options){
        var svgData = fabric.util.groupSVGElements(objects, options);
        svgData.top = 30;
        svgData.left = 50;
        canvas.add(svgData);
      });
    }
    canvi.renderAll();
  };

  return (
    <div>
      <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <h2>Items</h2>
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i className="bi bi-arrow-right-square-fill"></i>
          ) : (
            <i className="bi bi-arrow-left-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn" onClick={() => setInactive(!inactive)}>
          <i className="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>     
          <li className= {`menu-item ${show ? "showmenu" : ""}`}>
            <div className="iocn-link">
              <a href="#">
                <i className="fa fa-golf-ball" ></i>
                <span className="link_name">Ballons</span>
              </a>
              <i className='fa fa-chevron-down arrow' onClick={() => setshow(!show)} ></i>
            </div>
            <ul className="sub-menu">
              <li className= {`menu ${show01 ? "show" : ""}`}>
                <div className="iocn-link1">
                  <a href="#">
                    Simple Ballons
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow01(!show01)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src={logo} alt="" id="img1" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo2} alt="" id="img2" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo3} alt="" id="img3" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo4} alt="" id="img4" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo5} alt="" id="img5" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                  </div>
                </div>
              </li>
              <li className= {`menu ${show02 ? "show" : ""}`}>
                <div className="iocn-link1">
                  <a href="#">
                    Fansy Ballons
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow02(!show02)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src={fballon} alt="" id="img6" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={fballon2} alt="" id="img7" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={fballon3} alt="" id="img8" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={fballon3} alt="" id="img8" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">

                    </div>
                    <div className="div">

                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>


          <li className= {`menu-item ${show1 ? "showmenu" : ""}`}>
            <div className="iocn-link">
              <a href="#">
                <i className="fa fa-couch" ></i>
                <span className="link_name">Furniture</span>
              </a>
              <i className='fa fa-chevron-down arrow' onClick={() => setshow1(!show1)} ></i>
            </div>
            <ul className="sub-menu">
              <li className= {`menu ${show11 ? "show" : ""}`}>
                <div className="iocn-link1">
                  <a href="#">
                    Tables
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow11(!show11)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src="https://res.cloudinary.com/dnuuh99qn/image/upload/v1653366220/blue_ballon_cltoat.svg" alt="" id="img9" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo2} alt="" id="img10" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo3} alt="" id="img11" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo4} alt="" id="img12" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={logo5} alt="" id="img13" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                  </div>
                </div>
              </li>
              <li className= {`menu ${show12 ? "show" : ""}`}>
                <div className="iocn-link1">
                  <a href="#">
                    chairs
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow12(!show12)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src={logo9} alt="" id="img100" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src='https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico' id="img101" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)} />
                    </div>
                    <div className="div">

                    </div>
                    <div className="div">

                    </div>
                    <div className="div">

                    </div>
                    <div className="div">

                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>


        </ul>
      </div>

      {/* <div className="side-menu-footer">
        <div className="avatar">
        <i className="fa fa-user"></i>
        </div>
        <div className="user-info">
          <h5>xyz</h5>
          <p>xyz@gmail.com</p>
        </div>
      </div> */}
    </div>
            <div className="container">
              <div id="buttons">
                <button onClick={() => addRect(canvas)}>Add Rect</button>
                <button onClick={() => addCircle(canvas)}>Add Circle</button>
                <button onClick={() => addLine(canvas)}>Add Line</button>
                <button id="saveButton" onClick={() => SaveCanvas(canvas)}>Save</button>
                <button style={{"display":"none"}} id="updateButton" onClick={() => SaveCanvas(canvas)}>Update</button>
                <button onClick={() => deleteCanvas(canvas)}>Delete</button>
                {/* <button onClick={() => clearCanvas(canvas)}>Clear</button> */}
              </div>
              {/* <div id="images">
                  <img src='https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico' id="img1" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)} />
              </div> */}
              <canvas id="canvas" style={{ border: "1px solid black"}} />
      </div>
    </div>
  );
}
