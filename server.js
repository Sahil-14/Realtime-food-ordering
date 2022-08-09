require('dotenv').config();
const express = require('express');
const ejs = require('ejs')
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')
const passport = require('passport');
const Emitter = require('events')



const app = express();
const PORT = process.env.PORT || 8080;


//db connection
mongoose.connect("mongodb://localhost/pizza")
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Successfully conected to mongodb");
})


//session store
// let mongoStore = new MongodbStore({
//   mongooseConnection:connection,
//   collection:'sessions'
// })

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost/pizza"
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

//global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next();
})

//set template engine
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(expressLayouts);
app.set("views", path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app);





const server = app.listen(PORT, () => {
  console.log("Server is running on port " + PORT)
})




const io = require('socket.io')(server)
io.on('connection', (socket) => {
  // Join
  socket.on('join', (orderId) => {
    console.log('joind')
    socket.join(orderId)
  })
})

eventEmitter.on('orderUpdated', (data) => {

  io.to(`order_${data.id}`).emit('orderUpdated', data);

  console.log("updated", data)
})
