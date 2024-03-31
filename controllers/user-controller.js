const { localFileHandler } = require('../helpers/file-helpers');
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

      req.flash('success_messages', 'Successfully sign up.');
      return res.redirect('/signin');
    } catch (error) {
      next(error);
    }
  },
  signInPage: (req, res) => {
    return res.render('signin');
  },
  signIn: (req, res) => {
    req.flash('success_messages', 'Successfully sign in.');
    return res.redirect('/restaurants');
  },
  logout: (req, res, next) => {
    req.flash('success_messages', 'Successfully log out.');
    req.logout((err) => {
      if (err) return next(err);
    });
    return res.redirect('/signin');
  },
  getUser: async (req, res, next) => {
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);

      if (!user) throw new Error(`User doesn't exist.`);

      return res.render('users/profile', { user: user.toJSON() });
    } catch (error) {
      return next(error);
    }
  },
  editUser: async (req, res, next) => {
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);

      if (!user) throw new Error(`User doesn't exist.`);

      return res.render('users/edit', { user: user.toJSON() });
    } catch (error) {
      return next(error);
    }
  },
  putUser: async (req, res, next) => {
    const id = req.params.id;
    const { name } = req.body;
    const file = req.file;

    if (!name) throw new Error(`User name is required.`);

    try {
      const [user, filePath] = await Promise.all([
        User.findByPk(id),
        localFileHandler(file),
      ]);

      if (!user) throw new Error(`User doesn't exist.`);

      await user.update({
        name,
        image: filePath || null,
      });

      req.flash('success_messages', '使用者資料編輯成功');
      return res.redirect(`/users/${id}`);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userController;
