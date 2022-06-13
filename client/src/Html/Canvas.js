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
import cycle from "../img/new pik/bicycle-basket.png"
import arch from "../img/new pik/flower arch.png"
import path from "../img/new pik/garden-path.png"
import arch2 from "../img/new pik/leaf-flower-tree.png"
import arch3 from "../img/new pik/NicePng_arch-png_2161936.png"
import arch4 from "../img/new pik/PngItem_5976934.png"
import arch5 from "../img/new pik/pngwing.com.png"
import arch6 from "../img/new pik/Studio_Project.png"
import arch7 from "../img/new pik/Яндекс_Фотки переехали.png"
import bdlogo from "../img/new pik/—Pngtree—happy birthday golden typography text_7271162.png"
import grass from "../img/new pik/New folder/grass 2.png"
import grass2 from "../img/new pik/New folder/lawn-grass.png"
import lamp from "../img/new pik/lamp/imgbin_street-light-png.png"
import lamp2 from "../img/new pik/lamp/street lamp.png"
import lamp3 from "../img/new pik/lamp/treet lamp.png"
import gift from "../img/new pik/New folder/gift box gold.png"
import gift2 from "../img/new pik/New folder/gift box pink.png"
import gift3 from "../img/new pik/New folder/gift box white.png"
import gift4 from "../img/new pik/New folder/gift box with balloons.png"
import gift5 from "../img/new pik/New folder/gift box.png"



export default function Canvas() {
  const [canvas, setCanvas] = useState();
  const [inactive, setInactive] = useState(false);
  const [show, setshow] = useState(false);
  const [show01, setshow01] = useState(false);
  const [show02, setshow02] = useState(false);
  const [show1, setshow1] = useState(false);
  const [show11, setshow11] = useState(false);
  const [show12, setshow12] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show21, setshow21] = useState(false);
  const [show22, setshow22] = useState(false);


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
      document.getElementById("width").value = 700;
      document.getElementById("height").value = 500;
    }
    
  }, []);

  const initCanvas = () => {
    let obj = new fabric.Canvas("canvas", {
      height: 500,
      width: 700,
      backgroundColor: "white",
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
      let userData = JSON.parse(localStorage.getItem("userData"));
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
          let json2 = JSON.stringify({ canvas: jsonString, imageUrl: data.url, email: userData.email, width: document.getElementById("width").value, height: document.getElementById("height").value });
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
          let json2 = JSON.stringify({ id:editId,canvas: jsonString, imageUrl: data.url, width: document.getElementById("width").value, height: document.getElementById("height").value });
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
        document.getElementById("width").value = data.data.width;
        document.getElementById("height").value = data.data.height;
        handleSizeChange(canvi);
          canvi.loadFromJSON(json);
      }
  };

  const clearCanvas = (canvi) => {
    canvi.remove(...canvi.getObjects());
  };

  const deleteCanvas = (canvi) => {
    canvi.remove(canvi.getActiveObject());
  };

  const bringToFront = (canvi) => {
    var activeObj = canvas.getActiveObject();
    canvi.bringToFront(activeObj);
    canvi.renderAll();
  };

  
  const bringToBack = (canvi) => {
    var activeObj = canvas.getActiveObject();
    canvi.sendToBack(activeObj);
    canvi.renderAll();
  };

  const changeBackGroundColor = (e, canvi) => {
    canvi.backgroundColor=e.target.value;
    canvi.renderAll();
  };

  const onDragEndImage = (e, canvi) => {
    let imgElement = document.getElementById(e.target.id);
    let srcSplit = imgElement.src.split(".");
    imgElement.setAttribute('crossorigin', 'anonymous'); // works for me
    if (srcSplit[srcSplit.length - 1] == "png" || srcSplit[srcSplit.length - 1] == "jpg") {
      let src = imgElement.src;
      fabric.Image.fromURL(src, function (myImg) {
        canvas.add(myImg); 
      });
    }
    else if (srcSplit[srcSplit.length - 1] != "svg") {
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

  const handleSizeChange = (canvi) => {
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    if (width >= 100 && height >= 100 && width <= 1000 && height <= 1000) {
      canvi.setWidth(width);
      canvi.setHeight(height);
      canvi.calcOffset();
    }
  }

  return (
    <div>
      <div className={`side-menu ${inactive ? "" : "inactive"}`}>
      <div className="top-section">
        <div className="logo">
          <h2>Nav</h2>
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
                    Design
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow11(!show11)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src={cycle} crossOrigin="anonymous" alt="" id="img9" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={bdlogo} crossOrigin="anonymous" alt="" id="img10" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={path} crossOrigin="anonymous" alt="" id="img11" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={grass} crossOrigin="anonymous" alt="" id="img12" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={grass2} crossOrigin="anonymous" alt="" id="img13" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    
                  </div>
                </div>
              </li>
              <li className= {`menu ${show12 ? "show" : ""}`}>
                <div className="iocn-link1">
                  <a href="#">
                    Archs
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow12(!show12)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src={arch} crossOrigin="anonymous" alt="" id="img100" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img crossOrigin="anonymous" src={arch2}  id="img101" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)} />
                    </div>
                    <div className="div">
                    <img src={arch3} alt="" id="img104" draggable="true" crossOrigin="anonymous" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={arch4} alt="" id="img102" draggable="true" crossOrigin="anonymous" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={arch5} alt="" id="img103" crossOrigin="anonymous" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={arch6} alt="" id="img103" crossOrigin="anonymous" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={arch7} alt="" id="img103" crossOrigin="anonymous" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>



          <li className= {`menu-item ${show2 ? "showmenu" : ""}`}>
            <div className="iocn-link">
              <a href="#">
                <i className="fa fa-couch" ></i>
                <span className="link_name">Other</span>
              </a>
              <i className='fa fa-chevron-down arrow' onClick={() => setshow2(!show2)} ></i>
            </div>
            <ul className="sub-menu">
              <li className= {`menu ${show21 ? "show" : ""}`}>
                <div className="iocn-link1">
                  <a href="#">
                    lamps
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow21(!show21)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src={lamp} crossOrigin="anonymous" alt="" id="img1001" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={lamp2} crossOrigin="anonymous" alt="" id="img1000" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={lamp3} crossOrigin="anonymous" alt="" id="img1000" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                  </div>
                </div>
              </li>
              <li className= {`menu ${show22 ? "show" : ""}`}>
                <div className="iocn-link1">
                  <a href="#">
                    Gifts
                  </a>
                  <i className='fa fa-chevron-up arrow' onClick={() => setshow22(!show22)} ></i>
                </div>
                <div className="subsub-menu">
                  <div className="subsub-div">
                    <div className="div">
                    <img src={gift} crossOrigin="anonymous" alt="" id="img1002" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img crossOrigin="anonymous" src={gift2}  id="img1003" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)} />
                    </div>
                    <div className="div">
                    <img src={gift3} crossOrigin="anonymous" alt="" id="img1004" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={gift4} crossOrigin="anonymous" alt="" id="img1005" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
                    </div>
                    <div className="div">
                    <img src={gift5} crossOrigin="anonymous" alt="" id="img1006" d0raggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)}/>
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
                <button className="button-13" onClick={() => addRect(canvas)}>Rect</button>
                <button className="button-13" onClick={() => addCircle(canvas)}>Circle</button>
                <button className="button-13" onClick={() => addLine(canvas)}>Line</button>
                <button className="button-13" onClick={() => deleteCanvas(canvas)}>Delete</button>
                <button className="button-13" onClick={() => bringToFront(canvas)}>Front</button>
                <button className="button-13" onClick={() => bringToBack(canvas)}>Back</button>
                <button className="button-13" onClick={() => clearCanvas(canvas)}>Clear</button>
                <input className="button-13"  onChange={(e) => changeBackGroundColor(e, canvas)} type="color" />
                <input id="width" className="button-13" onChange={() => handleSizeChange(canvas)} type="number" style={{"width":"70px"}} placeholder="width" />
                <input id="height" className="button-13" onChange={() => handleSizeChange(canvas)} type="number" style={{"width":"70px"}} placeholder="height" />
              </div>
              {/* <div id="images">
                  <img src='https://res.cloudinary.com/dnuuh99qn/image/upload/v1647610124/favicon_tjk1nx.ico' id="img1" draggable="true" onDragEnd={(e) => onDragEndImage(e, canvas)} />
              </div> */}
              <canvas id="canvas"  style={{ border: "1px solid black"}} />
              <br />
              <button id="saveButton"  className="saveButton" onClick={() => SaveCanvas(canvas)}>Save</button>
              <button className="saveButton" style={{"display":"none"}} id="updateButton" onClick={() => SaveCanvas(canvas)}>Update</button>
      </div>
    </div>
  );
}
