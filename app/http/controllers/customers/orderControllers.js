const moment = require('moment')
const Order = require("../../../models/order");
const orderControllers = () => {
  return {
    async store(req, res) {
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash('error', 'all fields are required');
        return res.redirect('/cart');
      }
      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address
      })
      order.save().then(() => {
        req.flash('success', "Order placed successfully");
        delete req.session.cart
        return res.redirect('/customers/orders')
      }).catch((err) => {

        req.flash('error', 'Something went wrong')
        return res.redirect('/cart')
      })

    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, { sort: { 'createdAt': -1 } });
      res.header('Cache-Control', 'no-store')

      res.render('customers/orders', { orders, moment })

    },
    async show(req, res) {
      const id = req.params.id;
      const order = await Order.findById(id);
      //authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        res.render('customers/singleOrder', { order })
      } else {
        return res.redirect('/');
      }
    }
  }
}


module.exports = orderControllers;

