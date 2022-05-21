// global imports
// import '../toggleSidebar.js';
// import '../cart/toggleCart.js';
// import '../cart/setupCart.js';

//  filter imports
import setupSearch from './filters/search.js';
import setupCompanies from './filters/companies.js';
import setupPrice from './filters/price.js';

// specific imports
import { store, setupStore } from './store.js';
import display from '../Script files/displayProduct.js';
import { getElement } from '../Script files/util.js';
// import fetch products
import fetchProducts from '../Script files/fetchProduct.js';

const init2 = async () => {
  const loading = getElement('.page-loading');
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }
  display(store, getElement('.products-container'));

  setupSearch(store);
  setupCompanies(store);
  setupPrice(store);
  loading.style.display = 'none';
};

init2();
export default init2;