import { formatPrice } from './util.js';
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
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
    })
    .join('');


};

export default display;
