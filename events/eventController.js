const Event = require('./eventModel');
const router = require('express').Router();

router.get('/', (req, res) => {
  Round.find({})
    .then(events => {
      res.status(200).json(round);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/create-event", (req, res) => {

});

module.exports = router;
