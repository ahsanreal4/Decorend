import React from 'react';
import { useLayoutEffect, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import getScreenAccessible from "../ScreenHelper";

export default function Products() {
    let [screenLoading, setScreenLoading] = useState(false);

    useLayoutEffect(() => {
        if (!getScreenAccessible("Products")) {
            window.location.href = "/login";
        }
        import("../../CSS/About.css");
    }, []);

    useEffect(() => {
        setTimeout(() => {
            import("./Script files/index.js");
            setScreenLoading(true);
        }, 500);
    }, []);
    
    return (
        screenLoading == true && (        <div>
            
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Products</title>
            {/* font-awesome */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            {/* styles css */}      
            <link rel="stylesheet" href="styles.css" />
            {/* navbar */}
            <Navbar />
            
            {/* cart sign */}
            <div className="page">
                <div></div>
                <h2>
                    <strong>Products</strong>
                </h2>
                <div className="toggle-container">
                    <button className="toggle-cart">
                        <i className="fas fa-shopping-cart" />
                    </button>
                    <span className="cart-item-count">1</span>
                </div>
            </div>
            {/* sidebar */}
            <div className="sidebar-overlay">
                <aside className="sidebar">
                    {/* close */}
                    <button className="sidebar-close">
                        <i className="fas fa-times" />
                    </button>
                    {/* links */}
                    <ul className="sidebar-links">
                        <li>
                            <a href="index.html" className="sidebar-link">
                                <i className="fas fa-home fa-fw" />
                                home
                            </a>
                        </li>
                        <li>
                            <a href="products.html" className="sidebar-link">
                                <i className="fas fa-couch fa-fw" />
                                products
                            </a>
                        </li>
                        <li>
                            <a href="about.html" className="sidebar-link">
                                <i className="fas fa-book fa-fw" />
                                about
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>
            {/* cart */}
            <div className="cart-overlay">
                <aside className="cart">
                    <button className="cart-close">
                        <i className="fas fa-times" />
                    </button>
                    <header>
                        <h3 className="text-slanted">your bag</h3>
                    </header>
                    {/* cart items */}
                    <div className="cart-items" />
                    {/* footer */}
                    <footer>
                        <h3 className="cart-total text-slanted">
                            total : $12.99
                        </h3>
                        <button className="cart-checkout btn" onClick={(() => window.location.href = "/payment")}>checkout</button>
                    </footer>
                </aside>
            </div>
            {/* products */}
            <section className="products">
                {/* filters */}
                <div className="filters">
                    <div className="filters-container">
                        {/* search */}
                        <form className="input-form">
                            <input type="text" className="search-input" placeholder="search..." />
                        </form>
                        {/* categories */}
                        <h4>Company</h4>
                        <article className="companies">
                            <button className="company-btn">all</button>
                            <button className="company-btn">ikea</button>
                        </article>
                        {/* price */}
                        <h4>Price</h4>
                        <form className="price-form">
                            <input type="range" className="price-filter" min={0} defaultValue={50} max={100} />
                        </form>
                        <p className="price-value" />
                    </div>
                </div>
                {/* products */}
                <div className="products-container" />
            </section>
            {/* page loading */}
            <div className="page-loading">
                <h2>Loading...</h2>
            </div>
        </div>)
    );
}
