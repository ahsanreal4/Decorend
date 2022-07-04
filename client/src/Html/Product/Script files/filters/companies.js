import { getElement } from '../util.js';
import display from '../displayProduct.js';

const setupCompanies = (store) => {
  const form = getElement('.input-form2');
  const companyInput = document.getElementById("search_company");
  form.addEventListener('keyup', function () {
    const value = companyInput.value.toLowerCase();
    if (value) {
      const newStore = store.filter((product) => {
        let { company } = product;
        company = company.toLowerCase();
        if (company.startsWith(value) || company == value) {
          return product;
        }
      });
      display(newStore, getElement('.products-container'), true);
      if (newStore.length < 1) {
        const products = getElement('.products-container');
        products.innerHTML = `<h3 class="filter-error">
       sorry, no companies matched your search
       </h3>`;
      }
    } else {
      display(store, getElement('.products-container'), true);
    }
  });
};

export default setupCompanies;
