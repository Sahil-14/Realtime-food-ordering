
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

const init = (passport) => {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    //check if email exist
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: "No user with this email" });
    }
    // console.log(user)

    try {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, user, { message: 'Logged in successfully' })
      } else {
        return done(null, false, { message: 'Invalid credintials' })
      }
    } catch (error) {
      console.log(error);
      return done(null, false, { message: "Something went wrong" })
    }

  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  })



}

module.exports = init;