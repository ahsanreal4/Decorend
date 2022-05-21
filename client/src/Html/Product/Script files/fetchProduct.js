import { allProductsUrl } from './util.js';

const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/getProducts", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      }
    });
  let data = await response.json();
  let products = data.data;
  if (data.status == "ok") {
    return products;
  }
  return response;
};

export default fetchProducts;
