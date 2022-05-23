// specific imports
import { store, setupStore } from './canvasStore.js';
import display from './displayCanvases';
import { getElement } from '../Script files/util.js';
// import fetch products
import fetchProducts from '../Script files/fetchCanvas.js';
// import seller modal


const init2 = async () => {
  const loading = getElement('.page-loading');
  const products = await fetchProducts();
  setupStore(products);
  display(store, getElement('.products-container'));

  loading.style.display = 'none';
};

init2();
export default init2;