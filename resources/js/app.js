import axios from 'axios';
import Noty from 'noty'
import { create } from '../../app/models/order';
import initAdmin from './admin';
import moment from 'moment';
const socket = require("socket.io-client")("http://localhost:8080");

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

      text: err
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

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove()
  }, 2000)
}



initAdmin();


let statuses = document.querySelectorAll('.status_line')
//change order status
let hiddenInput = document.querySelector('#hiddenInput');

let order = hiddenInput ? hiddenInput.value : null;

order = JSON.parse(order);

let time = document.createElement('small');



function updateStatus(order) {
  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add('step-completed');
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format('hh:mm A')
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add('current');
      }

    }
  })
}

updateStatus(order)

//socket

// let socket = io()

// Join
if (order) {
  socket.emit('join', `order_${order._id}`)
  console.log("room")
}

socket.on('orderUpdated', (data) => {
  const updatedOrder = { ...order }
  updatedOrder.updatedAt = moment().format()
  updatedOrder.status = data.status
  console.log("order updated from app");
  updateStatus(updatedOrder)
  new Noty({
    type: 'success',
    timeout: 1000,
    text: 'Order updated',
    progressBar: false,
  }).show();
})