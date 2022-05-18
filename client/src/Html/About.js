import { useLayoutEffect } from "react";
import React from 'react';

export default function About() {

    useLayoutEffect(() => {
        import("../CSS/About.css");
    },[]);

    return (
        <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>About | Comfy</title>
            {/* font-awesome */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />
            {/* styles css */}
            <link rel="stylesheet" href="styles.css" />
            {/* hero */}
            <section className="page-hero">
                <div className="section-center">
                    <h3 className="page-hero-title">Home / About</h3>
                </div>
            </section>
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
                        <button className="cart-checkout btn">checkout</button>
                    </footer>
                </aside>
            </div>
            {/* about */}
            <section className="section section-center about-page">
                <div className="title">
                    <h2><span>/</span> our history</h2>
                </div>
                <p className="about-text">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
                    accusantium sapiente tempora sed dolore esse deserunt eaque excepturi,
                    delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta.
                    Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt
                    sequi blanditiis est exercitationem molestiae delectus saepe odio
                    eligendi modi porro eaque in libero minus unde sapiente consectetur
                    architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum
                    totam velit saepe sed quos similique amet. Ex, voluptate accusamus
                    nesciunt totam vitae esse iste.
                </p>
            </section>
        </div>
    );
}
