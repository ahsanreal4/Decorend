import { getStorageItem, setStorageItem } from './util.js';
let store = getStorageItem('store');
const setupStore = (products) => {
  store = products.map((product) => {
      const {
        _id,
        userID,
        imageUrl,
        canvas,
    } = product;
return {_id,
        userID,
        imageUrl,
        canvas };
  });
  setStorageItem('store', store);
};

const findProduct = (id) => {
  let product = store.find((product) => product._id === id);
  return product;
};

export { store, setupStore, findProduct };
