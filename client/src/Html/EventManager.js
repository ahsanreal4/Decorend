import React from 'react';
import { useLayoutEffect, useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import getScreenAccessible from "./ScreenHelper";
import UploadWidget from './UploadWidget';
import MySwal from "../AlertModel/MySwal";

export default function EventManager() {
    let [name, setName] = useState("");
    let [price, setPrice] = useState(0);
    let [company, setCompany] = useState("");
    let [description, setDescription] = useState("");
    let [screenLoading, setScreenLoading] = useState(false);

    useLayoutEffect(() => {
        if (!getScreenAccessible("EventManager")) {
            window.location.href = "/login";
        }
        import("../CSS/About.css");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            import("./Product/Script files/eventMan");
            setScreenLoading(true);
        }, 500);
    }, []);

    const updateProduct = async () => {
        let imageUrl = localStorage.getItem("url");
        if (imageUrl != null) {
        localStorage.removeItem("url");
        let productID = localStorage.getItem("productID");
        localStorage.removeItem("productID");    
        let id = productID;
        let data2 = JSON.parse(localStorage.getItem("userData"));
        let userId = data2.id;
            let imagesUrl = JSON.parse(localStorage.getItem("imagesUrl"));
            let images = imagesUrl.urls;
            console.log(images);
        let jsonObject = JSON.stringify({ "id": id, "userID": userId, "productType":"event", "fields": { "company": company, "colors": ["#f15025", "#222"], "price": document.getElementById("ProductPrice").value, "name": document.getElementById("ProductName").value, "imageUrl": imageUrl, "description": document.getElementById("description").value }, "imagesUrl" : images });
            console.log(jsonObject);
            const response = await fetch("http://localhost:3000/api/updateProduct", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonObject,
          });
          const data = await response.json();
          if (data.status === "ok") {
            MySwal("success", "Event updated!", 1500);
            setTimeout(() => {
              window.location.href = "/eventManager";
            }, 1500);
          }
        }
    }

    const addProduct = async () => {
        let imageUrl = localStorage.getItem("url");
        if (imageUrl != null) {
          localStorage.removeItem("url");
            let id = Date.now().toString();
            let data2 = JSON.parse(localStorage.getItem("userData"));
            let userId = data2.id;
            let imagesUrl = JSON.parse(localStorage.getItem("imagesUrl"));
            let images = imagesUrl.urls;
          let jsonObject = JSON.stringify({"id": id ,"userID": userId,"productType": "event", "fields": { "company": company, "colors": ["#f15025", "#222"], "price": price, "name": name, "imageUrl": imageUrl, "description": description }, "imagesUrl" : images  });
            const response = await fetch("http://localhost:3000/api/addProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonObject,
          });
          const data = await response.json();
          if (data.status === "ok") {
            MySwal("success", "Event added!", 1500);
            setTimeout(() => {
              window.location.href = "/eventManager";
            }, 1500);
          }
        }
    }
    
    return (
    screenLoading === true && (   

    <div>    
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Products</title>
        {/* font-awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
        {/* styles css */}      
        <link rel="stylesheet" href="" />
        {/* navbar */}
        <Navbar />
        
        {/* Add product */}
        <div className="page">
            <div></div>
            <h2>
                <strong>Listed Events</strong>
            </h2>
            <div className="toggle-container">
                <button className="toggle-cart">
                    <strong>Event</strong><i className="fas fa-plus" />
                </button>
            </div>
        </div>
        {/* products */}
        <section className="products">
            {/* products */}
            <div className="products-container" />
        </section>
        {/* Add Product */}
        <div className="modal-bg">
            <div className="mod">
                <div className="title"><b>Add Event</b></div>
                <form onSubmit={((e) => e.preventDefault())}>
                    <div className="details">
                        <div className="input">
                            <span className="label" htmlFor="ProductName"><b>Name</b></span>
                            <input autoComplete='off' onChange={((e) => setName(e.target.value))} required id="ProductName" placeholder='Enter Name'></input>
                        </div> 
                        <br />
                        <div className="input">
                            <span className="label" htmlFor="ProductPrice"><b>Price</b></span>
                            <input autoComplete='off' onChange={((e) => setPrice(e.target.value))} required id="ProductPrice" type="number" placeholder='Enter Price'></input> 
                                </div>
                                                  <div className="input">
                            <span className="label" htmlFor="ProductCompany"><b>Company Name</b></span>
                            <input id="ProductCompany" placeholder='Enter Company' onChange={((e) => setCompany(e.target.value))} />
                                </div>
                                 <div style={{"marginLeft":"35px"}} className="input">
                            <span className="label" htmlFor="description"><b>Description</b></span>
                            <input autoComplete='off' onChange={((e) => setDescription(e.target.value))} required id="description" placeholder='Enter Description'></input>
                        </div>
                        <br />
                        {/* <div className="input">
                            <span className="label" htmlFor="ProductName"><b>Company Name</b></span>
                            <select onChange={((e) => setCompany(e.target.value))} required >
                                <option value="" disabled selected hidden>Select Company</option>
                                <option value={"ikea"}>IKEA</option>
                            </select>
                        </div> */}
                    </div>     
                    <br />
                    <UploadWidget />
                    <br />
                
                    <div className='bt'>
                                <button className='button' id="addProductBtn" onClick={(() => addProduct())}><b>Add Event</b></button>
                                <button style={{"display":"none"}} className='button' id="updateProductBtn" onClick={(() => updateProduct())}><b>Update Event</b></button>
                                
                    </div>
                </form>
                <span className="modal-close"><i className="fas fa-times"/></span>
            </div>
        </div>

        {/* page loading */}
        <div className="page-loading">
        <h2>Loading...</h2>
        </div>


    </div>
    ));
}