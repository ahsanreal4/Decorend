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
    let [quantity, setQuantity] = useState(0);
    let [screenLoading, setScreenLoading] = useState(false);

    useLayoutEffect(() => {
        if (!getScreenAccessible("Seller")) {
            window.location.href = "/login";
        }
        import("../CSS/About.css");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            import("./Product/Script files/seller");
            setScreenLoading(true);
        }, 500);
    }, []);

        function containsAnyLetter(str) {
        return /[a-zA-Z]/.test(str);
        }


    const validateInput = () => {
        let price = document.getElementById("ProductPrice").value;
        if (price != undefined && price != null) {
            if (!containsAnyLetter(price)) {
                if (price != 0) {
                    return true;
                }
            } 
            else {
                MySwal("error", "Invalid Price", "800");
                return false;
            }
        }
    }
        

    const updateProduct = async () => {
        if (document.getElementById("ProductCompany").value != "" && validateInput() == true && document.getElementById("ProductPrice").value != "" && document.getElementById("ProductName").value != "" && document.getElementById("ProductQuantity").value != "") {
            let imageUrl = "";
            if (localStorage.getItem("url") != null) {
                imageUrl = localStorage.getItem("url");
            }
            localStorage.removeItem("url");
            let productID = localStorage.getItem("productID");
            localStorage.removeItem("productID");
            let id = productID;
            let data2 = JSON.parse(localStorage.getItem("userData"));
            let userId = data2.id;
            let imagesUrl = "";
            let images = "";
            if (localStorage.getItem("imagesUrl") != null) {
                imagesUrl = JSON.parse(localStorage.getItem("imagesUrl"));
                images = imagesUrl.urls;
            }
            let jsonObject = JSON.stringify({ "id": id, "userID": userId, "productType": "product", "fields": { "company": document.getElementById("ProductCompany").value, "colors": ["#f15025", "#222"], "price": document.getElementById("ProductPrice").value, "name": document.getElementById("ProductName").value, "imageUrl": imageUrl, "description": "", "quantity": document.getElementById("ProductQuantity").value }, "imagesUrl": images });
            const response = await fetch("http://localhost:3000/api/updateProduct", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonObject,
            });
            const data = await response.json();
            if (data.status === "ok") {
                MySwal("success", "Product updated!", 1500);
                setTimeout(() => {
                    window.location.href = "/seller";
                }, 1500);
            }
        }
    }

    const addProduct = async () => {
        let imageUrl = localStorage.getItem("url");
        if (imageUrl != null && validateInput() == true && document.getElementById("ProductCompany").value != "" && document.getElementById("ProductPrice").value != "" && document.getElementById("ProductName").value != "" && quantity != "") {
        localStorage.removeItem("url");
        let id = Date.now().toString();
        let data2 = JSON.parse(localStorage.getItem("userData"));
            let userId = data2.id;
            let imagesUrl = JSON.parse(localStorage.getItem("imagesUrl"));
            let images = imagesUrl.urls;
        let jsonObject = JSON.stringify({ "id": id, "userID": userId, "productType":"product", "fields": { "company": company, "colors": ["#f15025", "#222"], "price": price, "name": name, "imageUrl": imageUrl, "description": "", "quantity": document.getElementById("ProductQuantity").value }, "imagesUrl" : images });
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
              window.location.href = "/Seller";
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
                <strong>Listed Products</strong>
            </h2>
            <div className="toggle-container">
                <button className="toggle-cart">
                    <strong>Product</strong><i className="fas fa-plus" />
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
                            <span className="label" htmlFor="ProductPrice"><b>Price</b></span>
                            <input autoComplete='off' onChange={((e) => setPrice(e.target.value))} required id="ProductPrice" type="text" placeholder='Enter Price'></input> 
                        </div>
                        <br />
                        <br />
                        <div className="input">
                            <span className="label" htmlFor="ProductCompany"><b>Company Name</b></span>
                            <input id="ProductCompany" placeholder='Enter Company' onChange={((e) => setCompany(e.target.value))} />
                                </div>
                        <div style={{"marginRight":"11.8px"}} className="input">
                            <span className="label" htmlFor="ProductQuantity"><b>Quantity</b></span>
                            <input id="ProductQuantity" placeholder='Enter Quantity' onChange={((e) => setQuantity(e.target.value))} />
                        </div>
                    </div>     
                    <br />
                    <UploadWidget />
                    <br />
                    <div className='bt'>
                            <button className='button' id="addProductBtn" onClick={(() => addProduct())}><b>Add Product</b></button>
                            <button style={{"display":"none"}} className='button' id="updateProductBtn" onClick={(() => updateProduct())}><b>Update Product</b></button>
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
