const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const admin = require('./modules/admin');
const restaurantController = require('../controllers/restaurant-controller');
const userController = require('../controllers/user-controller');
const authHandler = require('../middlewares/auth-handler');

router.use('/admin', authHandler.authenticatedAdmin, admin);

router.get(
  '/restaurants/:id',
  authHandler.authenticated,
  restaurantController.getRestaurant
);
router.get(
  '/restaurants',
  authHandler.authenticated,
  restaurantController.getRestaurants
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
