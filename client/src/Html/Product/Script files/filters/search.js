import { getElement } from '../util.js';
import display from '../displayProduct.js';
const setupSearch = (store) => {
  const form = getElement('.input-form');
  const url = window.location.href;
  const urlSplit = url.split("/");
  const pageType = urlSplit[urlSplit.length - 1];
  const nameInput = document.getElementById("search_name");
  form.addEventListener('keyup', function () {
    const value = nameInput.value.toLowerCase();
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        if (name.startsWith(value) || name == value) {
          return product;
        }
      });
      display(newStore, getElement('.products-container'), true);
      if (newStore.length < 1 && pageType == "products") {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">
       sorry, no products matched your search
       </h3>`;
      }
      else if (newStore.length < 1 && pageType == "events") {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">
       sorry, no events matched your search
       </h3>`;
      }
    } else {
      display(store, getElement('.products-container'), true);
    }
  });
};

export default setupSearch;
