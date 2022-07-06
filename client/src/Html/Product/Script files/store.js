import { getStorageItem, setStorageItem } from './util.js';
let store = getStorageItem('store');
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      _id,
      fields: { name, price, company, colors, imageUrl, description, quantity },
      imagesUrl,
      productType
    } = product;
    return { _id, name, price, company, colors, imageUrl, description, imagesUrl, quantity, productType };
  });
  setStorageItem('store', store);
};

const findProduct = (id) => {
  let product = store.find((product) => product._id === id);
  return product;
};

export { store, setupStore, findProduct };
