const express = require('express');
const ejs = require('ejs')
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 8080;

//set template engine
app.use(express.static('public'))
app.use(expressLayouts);
app.set("views", path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


app.get("/", (req, res) => {
  res.render("home")
})

app.get('/cart', (req, res) => {
  res.render("customers/cart")
})

app.get('/login', (req, res) => {
  res.render("auth/login")
})

app.get('/register', (req, res) => {
  res.render("auth/register")
})



app.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
})