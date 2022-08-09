const Order = require('../../../models/order')
const orderController = () => {
  return {
    async index(req, res) {
      await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).
        populate('customerId', '-password').
        exec((err, orders) => {
          if (req.xhr) {
            return res.json(orders)
          }
          console.log(orders)
          return res.render('admin/orders', { orders })
        })
    }
  }
}

module.exports = orderController