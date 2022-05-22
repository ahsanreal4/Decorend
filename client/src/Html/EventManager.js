import React from 'react';
import { useLayoutEffect, useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import getScreenAccessible from "./ScreenHelper";
import UploadWidget from './UploadWidget';
import MySwal from "../AlertModel/MySwal";

export default function Seller() {
    let [name, setName] = useState("");
    let [price, setPrice] = useState(0);
    let [company, setCompany] = useState("");
    let [screenLoading, setScreenLoading] = useState(false);

    useLayoutEffect(() => {
        if (!getScreenAccessible("Products")) {
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


    const addProduct = async () => {
        let imageUrl = localStorage.getItem("url");
        if (imageUrl != null) {
          localStorage.removeItem("url");
          let id = Date.now().toString();
          let jsonObject = JSON.stringify({"id": id ,"productType": "event", "fields": { "company": company, "colors": ["#f15025", "#222"], "price": price, "name": name, "imageUrl": imageUrl, "description": "" }  });
            const response = await fetch("http://localhost:3000/api/addProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonObject,
          });
          const data = await response.json();
          if (data.status === "ok") {
            MySwal("success", "Product added!", 1500);
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
                <div className="title"><b>Add Product</b></div>
                <form onSubmit={((e) => e.preventDefault())}>
                    <div className="details">
                        <div className="input">
                            <span className="label" htmlFor="ProductName"><b>Name</b></span>
                            <input autoComplete='off' onChange={((e) => setName(e.target.value))} required id="ProductName" placeholder='Enter Name'></input>
                        </div> 
                        <br />
                        <div className="input">
                            <span className="label" htmlFor="ProductName"><b>Price</b></span>
                            <input autoComplete='off' onChange={((e) => setPrice(e.target.value))} required id="ProductName" type="number" placeholder='Enter Price'></input> 
                        </div>
                        <br />
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
                    <br />
                    <div className='bt'>
                    <button className='button' onClick={(() => addProduct())}><b>Add Product</b></button>
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
