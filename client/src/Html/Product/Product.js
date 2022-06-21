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

    const processPayment = () => {
        localStorage.setItem("paymentProcessing", "true");
        window.location.href = "/shippingAddress";
    }  
  
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
              <button className="cart-checkout btn" onClick={(() => processPayment())}>checkout</button>
            </footer>
          </aside>
        </div>
        {/* product info */}
        <section className="single-product">
        <div className="section-center single-product-center">
  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    {/* <div className="carousel-item active">
      <img id="cimg1" className="d-block w-100" src="" alt="First slide" />
    </div>
    <div className="carousel-item">
      <img id="cimg2" className="d-block w-100" src="" alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img id="cimg3" className="d-block w-100" src="" alt="Third slide" />
    </div> */}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
            {/* <img src="/images/main-bcg.jpeg" className="single-product-img img" alt="" /> */}
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
