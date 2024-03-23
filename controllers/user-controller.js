const bcrypt = require('bcryptjs');
const db = require('../models');
const { User } = db;

const userController = {
  signUpPage: (req, res) => {
    return res.render('signup');
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body;

      if (password !== passwordCheck)
        throw new Error('Passwords do not match.');

      const user = await User.findOne({ where: { email } });
      if (user) throw new Error('Email already exists.');

      const hash = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hash });

      req.flash('success_message', 'Successfully sign up.');
      return res.redirect('/signin');
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
