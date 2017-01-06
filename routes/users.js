var express = require('express');
var router = express.Router();

// File upload handler
var multer = require('multer');
var upload = multer({dest: './uploads'});

// Users page route
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User registration page route
router.get('/register', function(req, res, next) {
  res.render('register', {
    'title': 'Register'
  });
});

// User login page route
router.get('/login', function(req, res, next) {
  res.render('login', {
    'title': 'Login'
  });
});

router.post('/register', upload.single('profileimage'), function(req, res, next){
  //Get form values
  var name        = req.body.name;
  var email       = req.body.email;
  var username    = req.body.username;
  var password    = req.body.password;
  var password2   = req.body.password2;

  // Check for profile image field
  if(req.file){
    console.log('Uploading file...');
    // Set profile picture file info
    var profileImageOriginalName  = req.file.profileimage.originalname;
    var profileImageName          = req.file.profileimage.name;
    var profileImageMime          = req.file.profileimage.mimetype;
    var profileImagePath          = req.file.profileimage.path;
    var profileImageExt           = req.file.profileimage.extension;
    var profileImageSize          = req.file.profileimage.size;
  } else {
    // Set a default image (correct filepath probably set in another document)
    var profileImageName = 'noimage.png';
  }

  // Express-validator form validation check
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // Check for errors
  var errors = req.validationErrors();
  console.log(errors);

  if (errors) {
    // Errors found
    res.render('register', {
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    // No errors found
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileImageName
    });

    // Create user
    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    });

    // Success message
    req.flash('success', 'You are now registered and may log in.');
    res.location('/');
    res.redirect('/');
  }
});

module.exports = router;
