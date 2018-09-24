const jwt = require('jwt-simple');
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
    res.send({ token: tokenForUser(req.body) });
})

module.exports = router;
