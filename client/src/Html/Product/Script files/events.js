// global imports
// import './src/toggleSidebar.js';
import '../Script files/cart/toggleCart';
import '../Script files/cart/setupCart';
// specific imports
import fetchProducts from './fetchEvent';
import { setupStore, store } from './store';
import display from './displayProduct';
import { getElement } from './util';
import init2 from "./events2";

const init = async () => {
  let products = await fetchProducts();
  setupStore(products);
  init2();
};

init();
