// specific imports
import { store, setupStore } from './store.js';
import display from './displaysellerproduct';
import { getElement } from '../Script files/util.js';
// import fetch products
import fetchProducts from '../Script files/fetchProduct.js';
// import seller modal
import './modal/sellerModal';


const init2 = async () => {
  const loading = getElement('.page-loading');
  if (store.length < 1) {
    const products = await fetchProducts();
    setupStore(products);
  }
  display(store, getElement('.products-container'));

  loading.style.display = 'none';
};

init2();
export default init2;