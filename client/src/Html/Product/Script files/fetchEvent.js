import { allProductsUrl } from './util.js';

const fetchProducts = async () => {
  let data2 = JSON.parse(localStorage.getItem("userData"));
  let response;
  if (data2.userType == "user") {
    response = await fetch("http://localhost:3000/api/getEvents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "id": data2.id })
    });
  }
  let data = await response.json();
  let products = data.data;
  if (data.status == "ok") {
    return products;
  }
  return response;
};

export default fetchProducts;


