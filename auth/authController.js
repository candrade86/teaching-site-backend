const jwt = require('jwt-simple');
const bcrypt = require("bcrypt");
const router = require('express').Router();
const User = require('../users/userModel');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, username: user.username }, config.secret);
}

router.post('/signup', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
  
    if (!username || !email || !password) {
      return res.status(422).send({ error: 'You must provide username, email and password'});
    }
  
    User.findOne({ email: email }, function(err, existingUser) {
      console.log(existingUser);

      if (err) { return next(err); }
      
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }
 
      const user = new User({
        username,
        email,
        password
      });
  
      user.save(function(err) {
        if (err) { return next(err); }
  
        res.json({ token: tokenForUser(user) });
      });
    });
});

router.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let matched;

  if (!email || !password) {
    console.log('email or password are missing')
    return res.status(422).send({ error: 'You must provide an email and password'});
  }
  User.findOne({ email: email }, function(err, existingUser) {
    
  
    if (err) { res.json(err); }
    
    if (existingUser) {
      matched = bcrypt.compareSync(password, existingUser.password);

      if (matched) {
        res.json({ token: tokenForUser(existingUser) });
      }
    }
  });

});

module.exports = router;
