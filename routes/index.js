var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    console.log(req.user);
    res.render('index', { title: 'Members', user: req.user})
  } else {
    res.render('index', { title: 'Members' });
  }
});

module.exports = router;
