import React, { useLayoutEffect, useState } from 'react';
import UploadWidget from './UploadWidget';
import MySwal from "../AlertModel/MySwal";

export default function AddProduct() {
    let [name, setName] = useState("");
    let [price, setPrice] = useState(0);
    let [company, setCompany] = useState("");
  
    const addProduct = async () => {
        let imageUrl = localStorage.getItem("url");
        if (imageUrl != null) {
          localStorage.removeItem("url");
          let id = Date.now().toString();
          let jsonObject = JSON.stringify({"id": id ,"fields": { "company": company, "colors": ["#f15025", "#222"], "price": price, "name": name, "imageUrl": imageUrl, "description": "" }  });
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
              window.location.href = "/";
            }, 1500);
          }
        }
    }

  return (
      <div>
          <h1>Add Product</h1>
        <form onSubmit={((e) => e.preventDefault())}>
          <label htmlFor="ProductName">Name</label>
        <input autoComplete='off' onChange={((e) => setName(e.target.value))} id="ProductName" placeholder='Enter Name'></input> 
        <br />
        <label htmlFor="ProductName">Price</label>
              <input autoComplete='off' onChange={((e) => setPrice(e.target.value))} id="ProductName" type="number" placeholder='Enter Price'></input> 
              <br />
              <br />
              <select defaultValue={"0"} onChange={((e) => setCompany(e.target.value))}>
                  <option disabled value={"0"}>Select Company</option>
                  <option value={"ikea"}>IKEA</option>
              </select>      
              <br />
              <br />
              <UploadWidget />
              <br />
              <button onClick={(() => addProduct())}>Add Product</button>
      </form>
    </div>

  )
}
