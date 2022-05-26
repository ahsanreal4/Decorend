
import MySwal from '../../../AlertModel/MySwal.js';
import Swal from 'sweetalert2';
import { getElement } from './util.js';
const display = (products, element) => {
  // display products
  element.innerHTML = products
    .map((product) => {
      const { _id, imageUrl } = product;
      return ` <article style="border:1px solid gray" class="product">
          <div class="product-container">
            <img src="${imageUrl}" class="product-img img" />
           
            <div class="product-icons">
              <a href="/canvasPage?id=${_id}" class="product-icon edit-icon" id=${_id}>
                <i class="fas fa-edit" id=${_id}></i>
              </a>
              <a href="#" class="product-icon delete-icon" id=${_id}>
                <i class="fas fa-trash-alt" id=${_id}></i>
              </a>
            </div>
          </div>

        </article> `;
    })
    .join('');
  
  const deleteCanvas = async(id) => {
        const response = await fetch("http://localhost:3000/api/deleteCanvas", {
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

      if (parent.classList.contains('delete-icon') || e.target.classList.contains('delete-icon')) {
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
                deleteCanvas(id);
            }
        })

    }
  });
};


export default display;
