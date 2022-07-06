import React, { useLayoutEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import getScreenAccessible from "./ScreenHelper";

export default function Client() {
  let [screenLoading, setScreenLoading] = useState(false);
  useLayoutEffect(() => {
  if (!getScreenAccessible("Client")) {
      window.location.href = "/login";
    }
    import("../CSS/ClientHomePage.css");
    setTimeout(() => setScreenLoading(true), 700);
  });

  return (
    screenLoading == true && ( <div>
        <Navbar />
        {/* Background */}
        <div className="Cover" />
        {/* ImagesGrid */}
        <div className="imagesgrid" id="pics">
          {/* Photo Grid */}
          <div className="row"> 
            <div className="column">
              <img src="/images/events/party.jpg" style={{width: '100%'}} />
              <img src="/images/events/house-event.jpg" style={{width: '100%', height: '423px'}} />
              <img src="/images/events/wedding.jpg" style={{width: '100%', height: '380px'}} />
              <img src="/images/events/birthday2.jpg" style={{width: '100%'}} />
            </div>
            <div className="column">
              <img src="/images/events/wedding-event.jpg" style={{width: '100%'}} />
              <img src="/images/events/conference.jpg" style={{width: '100%', height: '273.5px'}} />
              <img src="/images/events/arrangment.jpg" style={{width: '100%', height: '275px'}} />
              <img src="/images/events/event2.jpg" style={{width: '100%'}} />
            </div>  
            <div className="column">
              <img src="/images/events/bridal-tobe.jpg" style={{width: '100%'}} />
              <img src="/images/events/concert2.jpg" style={{width: '100%'}} />
              <img src="/images/events/decor.jpg" style={{width: '100%'}} />
              <img src="/images/events/Decoration.jpg" style={{width: '100%'}} />
            </div>
            <div className="column">
              <img src="/images/events/bridal-shower.jpg" style={{width: '100%'}} />
              <img src="/images/events/partyplanner.jpg" style={{width: '100%'}} />
              <img src="/images/events/kids-party.jpg" style={{width: '100%'}} />
              <img src="/images/events/concert.jpg" style={{width: '100%', height: '267.5px'}} />
            </div>
          </div>
        </div>
        {/* start debugging-section */}
        <div className="debugging-section mt-5" id="event">
          <div className="container">
            <div className="row d-flex justify-content-center wow swing">
              <div className="col-sm-7 ml-3">
                <h2 className="mb-4 font-weight-bold">
                  <span style={{color: '#0a6d95'}}>Event Designs.</span>
                </h2>
                <p className="pt-3 font-weight-normal">View Wide Range of Plans from our Registered Event Managers and Choose the Ones you like. We have different themes like Birthday, Wedding, conference and Party and others. Pick the ones which suits your style and budget. 
                </p>
              </div>
              <div className="col-sm-4 zoom">
                <img src="images/event.jpg" className="img-fluid" alt="" />
              </div>
              <div className="buttons">
                <a href="/events" className="button">View Event Designs</a>
              </div>
            </div>
          </div>
        </div>
        {/* end debugging-section */}
        {/* start git-section */}
        <div className="git-section mt-2" id="design">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-sm-4 wow fadeInLeftBig zoom">
                <img src="images/canvas.jpg" className="img-fluid" alt="Git" style={{paddingBottom: '-10px', marginBottom: '-40px'}} />
              </div>
              <div className="col-sm-7 ml-3 wow fadeInRightBig" style={{paddingTop: '50px'}}>
                <h2 className="mb-4 font-weight-bold">
                  <span style={{color: '#65d6c8'}}>Create your own Design.</span>
                </h2>
                <p className="pt-3">Create Your own Event Design using our Customized Event Design Feature. We Provide Simple Drag and Drop Feature and a Canvas to make your Experience Easy.</p>
              </div>
              <div className="buttons">
                <a href = "/canvasPage" className="button">Create Customize Design</a>
              </div>
            </div>
          </div>
        </div>
        {/* end git-section */}
        {/* start debugging-section */}
        <div className="extension-section mt-5" id="ecommerce">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-sm-7 ml-3 wow rotateInDownRight">
                <h2 className="mb-4 font-weight-bold">
                  <span style={{color: '#0D8ABD'}}>Purchase Items.</span>
                </h2>
                <p className="pt-3">Purchase Items Related to Event Management from our Registered Sellers. Visit the E-commerce Section to proceed.</p>
              </div>
              <div className="col-sm-4 wow rotateInDownLeft zoom">
                <img src="images/sell.jpg" className="img-fluid" alt="debugging" />
              </div>
              <div className="buttons">
                <a href="/products" className="button">Visit E-commerce Section</a>
              </div>
            </div>
          </div>
        </div>
        {/* end debugging-section*/}
        {/* Footer start */}
        <footer className="page-footer font-small unique-color-dark pt-4 mt-5">
          <div className="content">
            <div className="left box">
              <div className="upper">
                <div className="topic">About us</div>
                <p>Decorend is a dedicated event Management platform where you can consume/provide event Management services.</p>
              </div>
              <div className="lower">
                <div className="topic" id="contact" style={{paddingTop: '30px'}}>Contact us</div>
                <div className="phone">
                  <a href="tel:+92310 4804303"><i className="fas fa-phone-volume" />+92310 4804303</a>
                  <br />
                  <a href="tel:+92315 4284162"><i className="fas fa-phone-volume" />+92315 4284162</a>
                </div>
                <div className="email">
                  <a href="mailto:info.Decorend@gmail.com"><i className="fas fa-envelope" />info.Decorend@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="middle box">
              <div className="topic">Our Services</div>
              <div><a href="#event">Event Management</a></div>
              <div><a href="#ecommerce">Sell/Purchase Items</a></div>
              <div><a href="#design">Create Customize Event Design</a></div>
            </div>
            <div className="right box">
              <div className="topic">Get in Touch</div>
              <form action="#">
                <input type="text" placeholder="Enter email address" />
                <input type="text" placeholder="Type Message" />
                <input type="submit"  defaultValue="Send" />
                <div className="media-icons">
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                  <a href="#"><i className="fab fa-instagram" /></a>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-youtube" /></a>
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </form>
            </div>
          </div>
          {/* Copyright */}
          <div className="container footer-copyright text-center py-3">
            <p>Copyright © 2022 <a href="#">Decorend</a> All rights reserved</p>
          </div>
        </footer>
        {/* end footer */}
        {/* Scripts */}
        {/* JQuery */}
        {/* Bootstrap tooltips */}
        {/* Bootstrap core JavaScript */}
        {/* MDB core JavaScript */}
        {/* coustom js */}
      </div>)
   
  );
}
