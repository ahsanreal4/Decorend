// global imports
// import './src/toggleSidebar.js';
import '../Script files/cart/toggleCart';
import '../Script files/cart/setupCart';
// specific imports
import fetchProducts from './fetchProduct';
import { setupStore, store } from './store';
import display from './displayProduct';
import { getElement } from './util';
import init2 from "./products";

const init = async () => {
  let products = await fetchProducts();
  setupStore(products);
  init2();
};

init();
