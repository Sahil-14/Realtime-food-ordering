

const homeController = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authController');
const cartControllers = require('../app/http/controllers/customers/cartControllers')
function initRoutes(app) {
  app.get("/", homeController().index)

  app.get('/cart', cartControllers().index)

  app.get('/login', authControllers().login)

  app.get('/register', authControllers().register)

  app.post('/update-cart',cartControllers().update)
}


module.exports = initRoutes