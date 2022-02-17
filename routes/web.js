
const homeController = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authController');
const cartControllers = require('../app/http/controllers/customers/cartControllers')
const orderControllers = require('../app/http/controllers/customers/orderControllers');
const adminOrderController = require('../app/http/controllers/admin/orderController');

const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');
function initRoutes(app) {
  app.get("/", homeController().index)

  app.get('/cart', cartControllers().index)

  app.get('/login', guest, authControllers().login)
  app.post('/login', authControllers().postLogin)

  app.get('/register', guest, authControllers().register)
  app.post('/register', authControllers().postRegister)

  app.post('/logout', authControllers().logout)

  app.post('/update-cart', cartControllers().update)

  //customer
  app.post('/orders', auth, orderControllers().store);
  app.get('/customers/orders', auth, orderControllers().index);

  //admin
  app.get('/admin/orders', admin, adminOrderController().index)

}


module.exports = initRoutes