
const homeController = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authController');
const cartControllers = require('../app/http/controllers/customers/cartControllers')

const guest = require('../app/http/middleware/guest')
function initRoutes(app) {
  app.get("/", homeController().index)

  app.get('/cart', cartControllers().index)

  app.get('/login', guest, authControllers().login)
  app.post('/login', authControllers().postLogin)

  app.get('/register', guest, authControllers().register)
  app.post('/register', authControllers().postRegister)

  app.post('/logout', authControllers().logout)

  app.post('/update-cart', cartControllers().update)
}


module.exports = initRoutes