var express = require('express');
var router = express.Router();

/*
 *  This is the / route.
 */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

// Ensure user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // If authentication lost
  res.redirect('/users/login');
}

module.exports = router;
