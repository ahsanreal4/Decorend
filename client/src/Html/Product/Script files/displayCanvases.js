
import { getElement } from './util.js';
const display = (products, element) => {
  // display products
  element.innerHTML = products
    .map((product) => {
      const { _id, imageUrl } = product;
      return ` <article style="border:1px solid gray" class="product">
          <div class="product-container">
            <img src="${imageUrl}" class="product-img img" />
           
            <div class="product-icons">
              <a href="/canvasPage?id=${_id}" class="product-icon edit-icon" id=${_id}>
                <i class="fas fa-edit" id=${_id}></i>
              </a>
            </div>
          </div>

        </article> `;
    })
    .join('');

};

export default display;
