const { ensureAuthenticated, getUser } = require('../helpers/auth-helpers');

const authenticated = (req, res, next) => {
  if (ensureAuthenticated(req)) return next();

  req.flash('error_messages', 'Please sign in.');
  return res.redirect('/signin');
};

const authenticatedAdmin = (req, res, next) => {
  if (ensureAuthenticated(req)) {
    if (getUser(req).isAdmin) return next();

    req.flash('error_messages', 'Permission required.');
    return res.redirect('/restaurants');
  } else {
    req.flash('error_messages', 'Please sign in.');
    return res.redirect('/signin');
  }
};

module.exports = {
  authenticated,
  authenticatedAdmin,
};
