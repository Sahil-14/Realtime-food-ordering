const Menu = require('../../models/menu')


function homeControllers() {
  return {
    async index(req, res) {
      const pizzas = await Menu.find();

      return res.render('home', { pizzas })


    }
  }
}

module.exports = homeControllers