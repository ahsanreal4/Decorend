import { formatPrice } from './util.js';
import { addToCart } from './cart/setupCart.js';
const display = (products, element, filters) => {
  // display products
  const url = window.location.href;
  const urlSplit = url.split("/");
  element.innerHTML = products
    .map((product) => {
      const { _id, name, imageUrl, price } = product;
      if (urlSplit?.length > 1 && urlSplit[urlSplit.length - 1] == "events") { 
        return ` <article class="product">
          <div class="product-container">
            <img src="${imageUrl}" class="product-img img" alt="${name}" />
           
            <div class="product-icons">
              <a href="/product?id=${_id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
      }
      else {
        return ` <article class="product">
          <div class="product-container">
            <img src="${imageUrl}" class="product-img img" alt="${name}" />
           
            <div class="product-icons">
              <a href="/product?id=${_id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${_id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
      }
    })
    .join('');

  if (filters) return;

  element.addEventListener('click', function (e) {
    const parent = e.target.parentElement;
    if (parent.classList.contains('product-cart-btn')) {
      addToCart(parent.dataset.id);
    }
  });
};

export default display;
