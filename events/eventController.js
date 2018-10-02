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
    let { title, start, end } = req.body;
    const events = new Events ({ title, start, end });

    events.save()
        .then(e => {
            res.status(201).json(e);
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/delete-event/:id', (req, res) => {
    const { id } = req.params;
    
    Events.findByIdAndRemove(id)
      .then(removed => {
        res.status(200).json(removed);
      })
      .catch(err => {
        res.status(500).json(console.error("Error deleting event", err));
      });
  });


module.exports = router;
