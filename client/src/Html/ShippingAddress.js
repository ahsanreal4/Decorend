import React, { useLayoutEffect, useState } from 'react';
import MySwal from '../AlertModel/MySwal';
import getScreenAccessible from './ScreenHelper';

export default function ShippingAddress() {
    let [zipCode, setZipCode] = useState("");
    let [address, setAddress] = useState("");
    let [city, setCity] = useState("");
    let [screenLoading, setScreenLoading] = useState(true);

    useLayoutEffect(() => {
        getScreenAccessible("ShippingAddress");
        if (localStorage.getItem("paymentProcessing") == null) {
            window.location.href = "/";
        }
        import("../CSS/ShippingAddress.css");
        setScreenLoading(false);
    }, []);

    const continueToPayment = async (e) => {
        e.preventDefault();
        if (zipCode != "" && address != "" && city != "") {
        let userData = JSON.parse(localStorage.getItem("userData"));
        let userID = userData.id;
        let country = "Pakistan";
        let json2 = JSON.stringify({
        userID,
        city,
        zipCode,
        address,
        country
        });
        const response = await fetch("http://localhost:3000/api/addShippingAddress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: json2,
        });
        const data = await response.json();
        if (data.status === "ok") {
            MySwal("success", "Saved Successfully!", 1500);
            setTimeout(() => {
            window.location.href = "/payment";
            }, 1500);
            }
        else {
            MySwal("error", "Some error occured!", 1000);
            }
        }
    }
    
    return (
         screenLoading == false && (
             <div className="container">
        <h1>Shipping</h1>
        <p>Please enter your shipping details.</p>
             <hr />
        <form onSubmit={continueToPayment}>
        <div className="form">
          <label className="field">
            <span className="field__label" htmlFor="address">Address</span>
            <input className="field__input" onChange={((e) => setAddress(e.target.value))} required type="text" id="address" />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="country">Country</span>
            <select className="field__input" defaultValue={"Pakistan"} required id="country">
              <option disabled value>Select country</option>
              <option value="Pakistan">Pakistan</option>
            </select>
          </label>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="zipcode">Zip code</span>
                <input
                  className="field__input"
                  type="tel"
                  minLength={5}
                  maxLength={5}
                  pattern="^\d{5}$"
                  onChange={(e) => {
                    setZipCode(e.target.value);
                    e.target.value = e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*)\./g, "$1");
                  }}
                  placeholder="54000"
                  required
                />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="city">City</span>
              <input className="field__input" onChange={((e) => setCity(e.target.value))} required type="text" id="city" />
            </label>
          </div>
        </div>
        <hr />
        <button type='submit' className="button">Continue</button>
        </form>
      </div>
         ) 
     
    );
}
