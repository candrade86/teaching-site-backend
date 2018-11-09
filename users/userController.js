const User = require('./userModel');
const router = require('express').Router();

router.put('/update', (req, res) => {
    const { id } = req.body;
    let update = req.body.update;
  
    User.findByIdAndUpdate(id, update)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json("Error updating updating USER", err);
      });
  });

module.exports = router;