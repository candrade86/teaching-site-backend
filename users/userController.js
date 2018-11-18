const User = require('./userModel');
const router = require('express').Router();

router.put('/update', (req, res) => {
    const { id, type, total } = req.body;
    let update;
    let numOfClasses;
    // console.log(id, type, total)
    
    switch (total) {
        case 20:
            numOfClasses = 1;
            break;
        case 90:
            numOfClasses = 5;
            break;
    }
    console.log('numOfClases', numOfClasses);
    

  
    User.findByIdAndUpdate(id, { $set: {'type.conversation': numOfClasses}})
      .then(updated => {
        res.status(200).json(updated);
        console.log('success man!!!')
      })
      .catch(err => {
        res.status(500).json("Error updating updating USER", err);
      });
  });

module.exports = router;