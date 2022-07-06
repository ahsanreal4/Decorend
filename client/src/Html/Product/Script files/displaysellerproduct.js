import { formatPrice } from './util.js';
import { getElement } from './util.js';
import MySwal from '../../../AlertModel/MySwal.js';
import Swal from 'sweetalert2';

const display = (products, element) => {
  // display products
  element.innerHTML = products
    .map((product) => {
      const { _id, name, imageUrl, price } = product;
      return ` <article class="product">
          <div class="product-container">
            <img src="${imageUrl}" class="product-img img" alt="${name}" />
           
            <div class="product-icons">
              <a href="/product?id=${_id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <a href="#" class="product-icon edit-icon" id=${_id}>
                <i class="fas fa-edit" id=${_id}></i>
              </a>
              <a href="#" class="product-icon delete-icon" id=${_id}>
                <i class="fas fa-trash-alt" id=${_id}></i>
              </a>
            </div>
          </div>
          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article> `;
    })
    .join('');
  
    const deleteProduct = async(id) => {
        const response = await fetch("http://localhost:3000/api/deleteProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id}),
        });
      const data = await response.json();
      if (data.status == "ok") {
        MySwal("success", "Deleted Successfully!", 1500);
        setTimeout(() => window.location.reload(), 1500);
      }
      else {
        MySwal("error", "Some error occurred", 1000);
      }
  }
  
  element.addEventListener('click', function (e) {
    const parent = e.target.parentElement;
    const id = e.target.id;

    if (parent.classList.contains('edit-icon') || e.target.classList.contains('edit-icon')) {
      const modelshow = getElement('.modal-bg');
      modelshow.classList.add('bg-active');
      const products = JSON.parse(localStorage.getItem("store"));
      let product = null;
      for (let i = 0; i < products.length; i++){
        let element = products[i];
        if (element._id == id) {
          product = element;
        }
      }
      if (product != null) {
        console.log(product);
        let inputName = document.getElementById("ProductName"); 
        let inputPrice = document.getElementById("ProductPrice");
        let addButton = document.getElementById("addProductBtn");
        let companyInput = document.getElementById("ProductCompany");
        let descriptionInput = document.getElementById("description");
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (userData.userType == "manager") {
          descriptionInput.value = product.description;
        }
        else {
          document.getElementById("ProductQuantity").value = product.quantity;
        }
        let updateButton = document.getElementById("updateProductBtn");
        companyInput.setAttribute('value', product.company);
        inputName.setAttribute('value', product.name);
        inputPrice.setAttribute('value', product.price);
        addButton.style.display = "none";
        updateButton.style.display = "block";
        localStorage.setItem("productID", product._id);
      }
    }
    else if (parent.classList.contains('delete-icon') || e.target.classList.contains('delete-icon')) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          deleteProduct(id);
        }
      });

    }
  });

};

export default display;
