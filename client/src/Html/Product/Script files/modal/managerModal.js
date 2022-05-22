import { getElement } from '../util.js';


const openmodal = getElement('.toggle-cart');
const closemodal = getElement('.modal-close');
const modelshow = getElement('.modal-bg');

openmodal.addEventListener('click', () => {
modelshow.classList.add('bg-active');
});
closemodal.addEventListener('click', () => {
modelshow.classList.remove('bg-active');
});