import { formatPrice } from './util.js';
import { getElement } from './util.js';
const display = (products, element) => {
  // display products
  element.innerHTML = products
    .map((product) => {
      const { _id, name, imageUrl, price } = product;
      return ` <article class="product">
          <div class="product-container">
            <img src="${imageUrl}" class="product-img img" alt="${name}" />
           
            <div class="product-icons">
              <a href="/product?id=${_id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <a href="#" class="product-icon edit-icon" id=${_id}>
                <i class="fas fa-edit" id=${_id}></i>
              </a>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
    })
    .join('');
  element.addEventListener('click', function (e) {
    const parent = e.target.parentElement;
    const id = e.target.id;

    if (parent.classList.contains('edit-icon') || e.target.classList.contains('edit-icon')) {
      const modelshow = getElement('.modal-bg');
      modelshow.classList.add('bg-active');
      const products = JSON.parse(localStorage.getItem("store"));
      let product = null;
      for (let i = 0; i < products.length; i++){
        let element = products[i];
        if (element._id == id) {
          product = element;
        }
      }
      if (product != null) {
        console.log(product);
        let inputName = document.getElementById("ProductName"); 
        let inputPrice = document.getElementById("ProductPrice");
        let addButton = document.getElementById("addProductBtn");
        let updateButton =  document.getElementById("updateProductBtn");
        inputName.setAttribute('value', product.name);
        inputPrice.setAttribute('value', product.price);
        addButton.style.display = "none";
        updateButton.style.display = "block";
        localStorage.setItem("productID", product._id);
      }
    }
  });

};

export default display;
