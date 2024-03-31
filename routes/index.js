const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const admin = require('./modules/admin');
const restController = require('../controllers/restaurant-controller');
const commentController = require('../controllers/comment-controller');
const userController = require('../controllers/user-controller');
const authHandler = require('../middlewares/auth-handler');

router.use('/admin', authHandler.authenticatedAdmin, admin);

router.get(
  '/restaurants/:id/dashboard',
  authHandler.authenticated,
  restController.getDashboard
);
router.get(
  '/restaurants/:id',
  authHandler.authenticated,
  restController.getRestaurant
);
router.get(
  '/restaurants',
  authHandler.authenticated,
  restController.getRestaurants
);

router.post(
  '/comments',
  authHandler.authenticated,
  commentController.postComment
);
router.delete(
  '/comments/:id',
  authHandler.authenticatedAdmin,
  commentController.deleteComment
);

router.get('/signup', userController.signUpPage);
router.get('/signin', userController.signInPage);
router.get('/logout', userController.logout);
router.post('/signup', userController.signUp);
router.post(
  '/signin',
  passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: true,
  }),
  userController.signIn
);

router.use('/', (req, res) => res.redirect('/restaurants'));

module.exports = router;
