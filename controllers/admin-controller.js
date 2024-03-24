const { Restaurant } = require('../models');

const adminController = {
  getRestaurants: async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({ raw: true });

      return res.render('admin/restaurants', { restaurants });
    } catch (error) {
      return next(error);
    }
  },
  getRestaurant: async (req, res, next) => {
    try {
      const id = req.params.id;

      const restaurant = await Restaurant.findByPk(id, { raw: true });
      if (!restaurant) throw new Error(`Restaurant doesn't exist.`);

      return res.render('admin/restaurant', { restaurant });
    } catch (error) {
      return next(error);
    }
  },
  createRestaurant: (req, res) => {
    return res.render('admin/create-restaurant');
  },
  postRestaurant: async (req, res, next) => {
    try {
      const { name, tel, openingHours, address, description } = req.body;

      if (!name) throw new Error('Restaurant name is required.');

      await Restaurant.create({
        name,
        tel,
        openingHours,
        address,
        description,
      });

      req.flash('success_message', 'Restaurant was successfully created.');
      return res.redirect('/admin/restaurants');
    } catch (error) {
      return next(error);
    }
  },
  editRestaurant: async (req, res, next) => {
    try {
      const id = req.params.id;

      const restaurant = await Restaurant.findByPk(id, { raw: true });
      if (!restaurant) throw new Error(`Restaurant doesn't exist.`);

      return res.render('admin/edit-restaurant', { restaurant });
    } catch (error) {
      return next(error);
    }
  },
  putRestaurant: async (req, res, next) => {
    try {
      const id = req.params.id;
      const { name, tel, openingHours, address, description } = req.body;

      if (!name) throw new Error('Restaurant name is required.');

      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) throw new Error(`Restaurant doesn't exist.`);

      await restaurant.update({
        name,
        tel,
        openingHours,
        address,
        description,
      });

      req.flash('success_message', 'Restaurant was successfully updated.');
      return res.redirect('/admin/restaurants');
    } catch (error) {
      return next(error);
    }
  },
  deleteRestaurant: async (req, res, next) => {
    try {
      const id = req.params.id;

      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) throw new Error(`Restaurant doesn't exist.`);

      await restaurant.destroy();

      req.flash('success_message', 'Restaurant was successfully deleted.');
      return res.redirect('/admin/restaurants');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = adminController;
