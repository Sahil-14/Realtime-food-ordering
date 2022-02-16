import axios from 'axios';
import Noty from 'noty'
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

const updateCart = (pizza) => {
  axios.post('/update-cart', pizza).then((res) => {
    cartCounter.innerText = res.data.totalQty;
    new Noty({
      type: 'success',
      theme: 'mint',
      timeout: 1000,
      progressBar: false,
      text: ` ${pizza.name} added to cart`
    }).show();
  }).catch((err) => {
    new Noty({
      type: 'error',
      theme: 'mint',
      timeout: 1000,
      progressBar: false,

      text: `Error to add pizza`
    }).show();
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    console.log(pizza);
  })
})