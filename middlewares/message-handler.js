const { getUser } = require('../helpers/auth-helpers');

module.exports = {
  generalMessageHandler: (req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.user = getUser(req);
    next();
  },
};
