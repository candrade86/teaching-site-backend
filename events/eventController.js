const Events = require('./eventModel');
const router = require('express').Router();

router.get('/', (req, res) => {
  Events.find({})
    .then(events => {
      res.status(200).json(events);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/create-event", (req, res) => {

});

module.exports = router;
