import React, { useState, useLayoutEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import getScreenAccessible from "../ScreenHelper";

export default function Product() {
    let [screenLoading, setScreenLoading] = useState(false);

    useLayoutEffect(() => {
        // if (!getScreenAccessible("Product")) {
        //     window.location.href = "/login";
        // }
      import("../../CSS/About.css");
      setScreenLoading(true);
      import("./Script files/product.js");
    }, []);

  return (
    screenLoading == true &&
    (<div>
      <Navbar />
        <div className="toggle-container">
            <button className="toggle-cart">
              <i className="fas fa-shopping-cart" />
            </button>
            <span className="cart-item-count">1</span>
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
        {/* product info */}
        <section className="single-product">
          <div className="section-center single-product-center">
            <img src="/images/main-bcg.jpeg" className="single-product-img img" alt="" />
            <article className="single-product-info">
              <div>
                <h2 className="single-product-title">couch</h2>
                <p className="single-product-company text-slanted">
                  by marcos
                </p>
                <p className="single-product-price">$30.00</p>
                <div className="single-product-colors" />
                <p className="single-product-desc">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id,
                  modi? Minima libero doloremque necessitatibus! Praesentium
                  recusandae quod nesciunt animi voluptatem!
                </p>
                <button className="addToCartBtn btn" data-id="id">
                  add to cart
                </button>
              </div>
            </article>
          </div>
        </section>
        <div className="page-loading">
          <h2>loading...</h2>
        </div>
    </div>
    )
  )
}
