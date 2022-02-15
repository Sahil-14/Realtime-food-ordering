const express = require('express');
const ejs = require('ejs')
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 8080;

//set template engine
app.use(express.static('public'))
app.get("/", (req, res) => {
  res.render("home")
})

app.use(expressLayouts);
app.set("views", path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')




app.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
})