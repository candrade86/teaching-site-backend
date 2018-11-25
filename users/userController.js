const User = require('./userModel');
const router = require('express').Router();

router.post('/',  (req, res) => {
    const { id } = req.body;
    
    User.findById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router.put('/update', (req, res) => {
    console.log(req.body)
    const { id, type, total } = req.body;
    let update;
    let numOfClasses;
    
    switch (total) {
        case 20:
            numOfClasses = 1;
            break;
        case 90:
            numOfClasses = 5;
            break;
        }
    if (total === -1) {
        numOfClasses = -1;
    } 

    console.log('after', numOfClasses)
    User.findByIdAndUpdate(id, { $inc: { [`classType.${type}`]: numOfClasses } }, {new: true})
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json("Error updating updating USER", err);
      });
  });

module.exports = router;