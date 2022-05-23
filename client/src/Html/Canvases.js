import React, {useLayoutEffect, useEffect, useState} from 'react'
import getScreenAccessible from './ScreenHelper';
import Navbar from './Navbar/Navbar';
import UploadWidget from './UploadWidget';
import MySwal from "../AlertModel/MySwal";


export default function Canvases() {
    let [screenLoading, setScreenLoading] = useState(false);

    useLayoutEffect(() => {
    if (!getScreenAccessible("Canvases")) {
        window.location.href = "/login";
    }
    import("../CSS/About.css");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            import("./Product/Script files/canvas.js");
            setScreenLoading(true);
        }, 500);
    }, []);

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
                <strong>Added Designs</strong>
            </h2>
            <div className="toggle-container">
                        <button onClick={() => window.location.href = "/canvasPage"} className="toggle-cart">
                    <strong>Design</strong><i className="fas fa-plus" />
                </button>
            </div>
        </div>
        {/* products */}
        <section className="products">
            {/* products */}
            <div className="products-container" />
        </section>

        {/* page loading */}
        <div className="page-loading">
        <h2>Loading...</h2>
        </div>


    </div>
    ));
}
