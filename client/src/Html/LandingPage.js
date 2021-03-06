import React, { useLayoutEffect,useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { Bounce, LightSpeed, Zoom, Rotate, Roll } from "react-reveal";
import { StreamChat } from "stream-chat";
import Wobble from 'react-reveal/Wobble';
import MySwal from "../AlertModel/MySwal";

export default function LandingPage() {
  let [screenLoading, setScreenLoading] = useState(false);


      const addToBiddingChannel = async (userData, client) => {
        const filter = { type: 'team', name: { $autocomplete: "Bidding Channel" } };
        const sort = [{ last_message_at: -1 }];

        const channels = await client.queryChannels(filter, sort, {
            watch: true, // this is the default
            state: true,
        });
        if (channels?.length > 0) {
            let userFound = false;
            for (let i = 0; i < channels.length; i++){
                let channel = channels[i];
                let members = Object.values(channel.state.members);  
                for (let a = 0; a < members?.length; a++){
                    let member = members[a];
                    if (member.user_id == userData.id) {
                      userFound = true;
                        break;
                    }
                }
            }
            if (!userFound) {
                const response = await client.queryUsers({ id: { $eq: userData.id } },
                { id: 1 },
                  { limit: 8 });
                if (response.users.length) {
                  channels[0].addMembers([response.users[0].id]);
                  setTimeout(() => {
                  if (userData.userType == "user") {
                  window.location.href = "/Client";
                  }
                  else if (userData.userType == "manager") {
                    window.location.href = "/EventManager";
                  }
                  }, 300);
              }
                else {
                  setTimeout(() => {
                  if (userData.userType == "user") {
                  window.location.href = "/Client";
                  }
                  else if (userData.userType == "manager") {
                    window.location.href = "/EventManager";
                  }
                  }, 300);
              }
          }
          else {
              if (userData.userType == "user") {
             window.location.href = "/Client";
            }
            else if (userData.userType == "manager") {
              window.location.href = "/EventManager";
            }
          }
        }
  };
  
  const getClientToken = async (client) => {
      
            let userData = JSON.parse(localStorage.getItem("userData"));
            let json2 = JSON.stringify({ id: "628ba64f66961b5a2385d95b" });

            const response = await fetch("http://localhost:3000/api/createChatToken", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: json2,
            });
            const data = await response.json();
            if (data?.token != undefined && data.token != null) {
            localStorage.setItem("token2", data.token);
            }
            if (data.status === "ok") {
                client.connectUser({
                    id: "628ba64f66961b5a2385d95b",
                    name: "Ahsan Azeem Ullah Butt",
                }, localStorage.getItem("token2"));
              await addToBiddingChannel(userData, client);
      }
            else {
              MySwal("error", "Error! Please Reload Page", 1000);
      }
            
  };
  
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userData"));
    const apiKey = "8gb6yku7bpbd";
    const client = StreamChat.getInstance(apiKey);
    if (data != undefined && data != null && (data.userType == "user" || data.userType == "manager")) {   
      getClientToken(client);
    }
    else {
      if (data != undefined && data != null) {
        window.location.href = "/Seller";
      }
      else {
        import("../CSS/LandingPage.css");
        setScreenLoading(true);
      }
    }
  }, []);

  useLayoutEffect(() => {
    let data = JSON.parse(localStorage.getItem("userData"));
    localStorage.removeItem("paymentProcessing");
    localStorage.removeItem("imagesUrl");
    localStorage.removeItem("cart");
    localStorage.removeItem("tempUserId");
    localStorage.removeItem("tempName");
    localStorage.removeItem('productTempId');
    localStorage.removeItem("orderToId");
    localStorage.removeItem("orderType");
    localStorage.removeItem("cart2");
  });

  return (
    screenLoading == true && ( <div>
        <Navbar />
         <header>
            <div className="container home">
              <div className="first row align-items-center">
                {/* Column 1*/}
                <div className="col-md-6">
                  <h1 className="mb-4 font-weight-bold">We Organize your
                    <span className="text-info">Happiness</span>
                  </h1>
                  <p className="mb-4 pb-2 ">
                    We provide Event Management services through our professional event managers. You can either pick a design of your choice or create a design of yours by using our customized design feauture. You can also purchase/rent related items from our sellers.        </p>
                  <div>
                    <a href="#contact" className="text-center btn btn-outline-blue-grey btn-block">Contact Us</a>
                  </div>
                </div>
                <div className="col-md-6 d-none d-sm-none d-md-block">
                  <img src="/images/work.png" alt="tours pics" className="img-fluid" />
                </div>
              </div>
            </div>
          </header>
          {/* Background */}
          <div className="Cover" />
          {/* ImagesGrid */}
          <div className="imagesgrid" id="pics">
            {/* Photo Grid */}
            <div className="row"> 
              <div className="column">
                <img src="/images/events/party.jpg" alt="" style={{width: '100%'}} />
                <img src="/images/events/house-event.jpg" alt="" style={{width: '100%', height: '423px'}} />
                <img src="/images/events/wedding.jpg" alt="" style={{width: '100%', height: '380px'}} />
                <img src="/images/events/birthday2.jpg" alt="" style={{width: '100%'}} />
              </div>
              <div className="column">
                <img src="/images/events/wedding-event.jpg"alt=""  style={{width: '100%'}} />
                <img src="/images/events/conference.jpg" alt="" style={{width: '100%', height: '273.5px'}} />
                <img src="/images/events/arrangment.jpg" alt=""  style={{width: '100%', height: '275px'}} />
                <img src="/images/events/event2.jpg" alt="" style={{width: '100%'}} />
              </div>  
              <div className="column">
                <img src="/images/events/bridal-tobe.jpg" alt="" style={{width: '100%'}} />
                <img src="/images/events/concert2.jpg" alt="" style={{width: '100%'}} />
                <img src="/images/events/decor.jpg" alt="" style={{width: '100%'}} />
                <img src="/images/events/Decoration.jpg" alt="" style={{width: '100%'}} />
              </div>
              <div className="column">
                <img src="/images/events/bridal-shower.jpg" alt="" style={{width: '100%'}} />
                <img src="/images/events/partyplanner.jpg" alt="" style={{width: '100%'}} />
                <img src="/images/events/kids-party.jpg" alt="" style={{width: '100%'}} />
                <img src="/images/events/concert.jpg" alt="" style={{width: '100%', height: '267.5px'}} />
              </div>
            </div>
          </div>
          {/*Service cart */}
          <div className="services" id="service"> 
            <h1 className="mb-4 font-weight-bold">
              <span style={{color: '#017F8D'}}>Services</span>
            </h1>  
            <div className="content">
              <div className="card one">
                <div className="top">
                  <div className="title">Event Designs</div>
                </div>
                <div className="info">Organzie your events</div>
                <div className="details">
                  <div className="one">
                    <span>Pre Design Events</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Publish your events</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Book future events</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Modify Plans</span>
                    <i className="fas fa-check" />
                  </div>
                  <a href="#event" style={{textDecoration: 'none'}}><button> Join Us!</button></a>
                </div>
              </div>
              <div className="card two">
                <div className="top">
                  <div className="title">Customize events</div>
                </div>
                <div className="info">Create your event as you want</div>
                <div className="details">
                  <div className="one">
                    <span>Custom Design Event</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Design by Drag and Drop</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Get Estimated Budget</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Bid on customized events</span>
                    <i className="fas fa-check" />
                  </div>
                  <a href="#design" style={{textDecoration: 'none'}}><button>Join Us!</button></a>
                </div>
              </div>
              <div className="card three">
                <div className="top">
                  <div className="title">Sell/Purchase</div>
                </div>
                <div className="info">Buy/Rent items</div>
                <div className="details">
                  <div className="one">
                    <span>Buy/Rent items</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Sell/Rent out item</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Secured Transactions</span>
                    <i className="fas fa-check" />
                  </div>
                  <div className="one">
                    <span>Order Customized events</span>
                    <i className="fas fa-check" />
                  </div>
                  <a href="#ecommerce" style={{textDecoration: 'none'}}><button>Join Us!</button></a>
                </div>
              </div>
            </div>
          </div>
          {/* start debugging-section */}
          <div className="debugging-section mt-5" id="event">
            <div className="container">
              <div className="row d-flex justify-content-center wow swing">
                <div className="col-sm-7 ml-3">
                <Roll left>
                  <h2 className="mb-4 font-weight-bold">
                    <span style={{color: '#0a6d95'}}>Event Designs.</span>
                  </h2>
                  </Roll>
                  <Bounce top>
                  <p className="pt-3 font-weight-normal">What you need, is an Event, to remember for a lifetime..<br />View our Event plans and choose one of your choice!
                  </p>
                  </Bounce>
                </div>
                <LightSpeed right>
                <div className="col-sm-4 zoom">
                  <img src="images/event.jpg" className="img-fluid" alt="" />
                </div>
                </LightSpeed>
              </div>
            </div>
          </div>
          {/* end debugging-section */}
          {/* start git-section */}
          <div className="git-section mt-2" id="design">
            <div className="container">
              <div className="row d-flex justify-content-center">
              <Rotate top right>
                <div className="col-sm-4 wow fadeInLeftBig zoom">
                  <img src="images/canvas.jpg" className="img-fluid" alt="Git" />
                </div>
                </Rotate>
                <Rotate top left>
                <div className="col-sm-7 ml-3 wow fadeInRightBig" style={{paddingTop: '50px'}}>
                  <h2 className="mb-4 font-weight-bold">
                    <span style={{color: '#65d6c8'}}>Create your own Design.</span>
                  </h2>
                  <p className="pt-3">You can't use up creativity. The more you use, the more you have.. <br />Create your own Event designs and turn them in reality!</p>
                </div>
                </Rotate>
              </div>
            </div>
          </div>
          {/* end git-section */}
          {/* start debugging-section */}
          <div className="extension-section mt-5" id="ecommerce">
            <div className="container">
            <Wobble>
              <div className="row d-flex justify-content-center">
                <div className="col-sm-7 ml-3 wow rotateInDownRight">
                  <h2 className="mb-4 font-weight-bold">
                    <span style={{color: '#0D8ABD'}}>Sell/Purchase Items.</span>
                  </h2>
                  <p className="pt-3"> Sell the best. Purchase from the best..<br />Sell and purchase Event related products!
                  </p>
                </div>
                <Zoom top>
                <div className="col-sm-4 wow rotateInDownLeft zoom">
                  <img src="images/sell.jpg" className="img-fluid" alt="debugging" />
                </div>
                </Zoom>
              </div>
              </Wobble>
            </div>
          </div>
          {/* end debugging-section*/}
          {/* Footer start */}
          <footer className="page-footer font-small unique-color-dark pt-4 mt-5">
            <div className="content">
              <div className="left box">
                <div className="upper">
                  <div onClick={(() => window.location.href = "/about")} className="topic"><a style={{"textDecoration":"none"}}>About us</a></div>
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
                  <input type="submit" defaultValue="Send" />
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
              <p>Copyright ?? 2022 <a href="#">Decorend</a> All rights reserved</p>
            </div>
          </footer>
          {/* end footer */}

      </div>)
     
  );
}
