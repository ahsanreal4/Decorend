import { getElement } from '../util.js';


const openmodal = getElement('.toggle-cart');
const closemodal = getElement('.modal-close');
const modelshow = getElement('.modal-bg');

openmodal.addEventListener('click', () => {
    modelshow.classList.add('bg-active');
    if (localStorage.getItem("productID") == null) {
        document.getElementById("updateProductBtn").style.display = "none";
        document.getElementById("addProductBtn").style.display = "inline";
        document.getElementById("ProductName").value = "";
        document.getElementById("ProductPrice").value = "";
        document.getElementById("description").value = "";
    }
});
closemodal.addEventListener('click', () => {
    modelshow.classList.remove('bg-active');
    localStorage.removeItem("productID");
    localStorage.removeItem("url");
    localStorage.removeItem("imagesUrl");
});