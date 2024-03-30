const { Restaurant, Category, Comment, User } = require('../models');
const { getOffset, getPagination } = require('../helpers/pagination-helper');

const restaurantController = {
  getRestaurants: async (req, res, next) => {
    const DEFAULT_LIMIT = 9;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || DEFAULT_LIMIT;
    const offset = getOffset(page, limit);
    const categoryId = Number(req.query.categoryId) || '';

    try {
      const [restaurantData, categories] = await Promise.all([
        Restaurant.findAndCountAll({
          include: [Category],
          where: {
            ...(categoryId ? { categoryId } : {}),
          },
          limit,
          offset,
          nest: true,
          raw: true,
        }),
        Category.findAll({ raw: true }),
      ]);

      const restaurants = restaurantData.rows.map((restaurant) => ({
        ...restaurant,
        description: restaurant.description.substring(0, 50),
      }));

      return res.render('restaurants', {
        restaurants,
        categories,
        categoryId,
        pagination: getPagination(page, limit, restaurantData.count),
      });
    } catch (error) {
      return next(error);
    }
  },
  getRestaurant: async (req, res, next) => {
    const id = req.params.id;

    try {
      const restaurant = await Restaurant.findByPk(id, {
        include: [Category, { model: Comment, include: [User] }],
        nest: true,
      });

      if (!restaurant) throw new Error(`Restaurant doesn't exist!`);

      return res.render('restaurant', { restaurant: restaurant.toJSON() });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = restaurantController;
