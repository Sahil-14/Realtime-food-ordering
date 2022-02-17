const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../models/user');
function authControllers() {
  return {
    login(req, res) {
      res.render('auth/login')
    },
    async postLogin(req, res, next) {
      passport.authenticate('local', (err, user, info) => {
        const { email, password } = req.body;
        if (err) {
          req.flash('error', info.message);
          return next(err);
        }
        //validation
        if (!email || !password) {
          req.flash('error', "All fields are required");
          req.flash('email', email);
          return res.redirect('/login');
        }
        if (!user) {
          req.flash('error', info.message);
          return res.redirect('/login')
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash('error', info.message);
            return next(err);
          }
          return res.redirect('/');
        })
      })(req, res, next)
    },
    register(req, res) {
      res.render('auth/register')
    },
    async postRegister(req, res) {
      const {
        name, email, password
      } = req.body;

      //validation
      if (!name || !email || !password) {
        req.flash('error', "All fields are required");
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect('/register');
      }

      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash('error', "Email already exist");
          req.flash('name', name);
          req.flash('email', email);
          return res.redirect('/register');
        }
      })

      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      //create user
      const user = new User({
        name, email, password: hashedPassword
      })
      user.save().then((user) => {
        return res.redirect('/');
      }).catch((error) => {
        req.flash('error', error);

        return res.redirect('/register');
      })
    },
    logout(req, res) {
      req.logout();
      return res.redirect('/login');
    }

  }
}

module.exports = authControllers