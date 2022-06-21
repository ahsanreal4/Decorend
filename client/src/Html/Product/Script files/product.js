// global imports
// import '../toggleSidebar.js';
import './cart/toggleCart.js';
import './cart/setupCart.js';
// specific
import { addToCart } from './cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from './util.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
// const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

 async function getProduct() {
  const urlID = window.location.search;

   try {
     let id = "";
     for (let i = 4; i < urlID.length; i++){
         id += urlID[i];
     }
    const response = await fetch(`http://localhost:3000/api/getProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      })
    });
    let data = await response.json();
    if (data.status == "ok") {
      const product = data.data;
      // grab data
      const { _id, fields, imagesUrl } = product;
      productID = _id;

      let { name, company, price, colors, description } = fields;
      if (description == "") {
        description = "No description.";
      }
      if (product.productType == "event") {
        cartBtn.innerHTML = "Book Event";
      }
      // const image = fields.imageUrl;
      // imgDOM.src = image;
      for (let i = 0; i < imagesUrl?.length; i++){
        let url2 = imagesUrl[i];
        let id = "cimg" + (i + 1);
        if (i == 0) {
          document.getElementsByClassName("carousel-inner")[0].innerHTML += `<div style='max-height : 550px; max-width:600px' class='carousel-item active'><img id='${id}' class='d-block w-100' src='${url2}' alt='First Slide' /></div>`;
        }
        else {
            document.getElementsByClassName("carousel-inner")[0].innerHTML += `<div style='max-height : 550px; max-width:600px' class='carousel-item'><img id='${id}' class='d-block w-100' src='${url2}' alt='Second Slide' /></div>`;
        }
        }
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
    <div>
    <h3 class="error">sorry, something went wrong</h3>
    <a href="/" class="btn">back home</a>
    </div> 
     `;
    }
  } catch (error) {
    console.log(error);
  }

  loading.style.display = 'none';
}
  
cartBtn.addEventListener('click', function () {
  addToCart(productID);
});

getProduct();
