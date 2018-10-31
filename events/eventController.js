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

router.get('/session/:id',  (req, res) => {
  const id = req.params.id;
  
  Events.findById(id)
    .then(session => {
      res.status(200).json(session);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/classes', (req, res) => {
  let title  = req.body.username;
  console.log('title', title)
  let eventMap=[];

  Events.find({})
    .then(events => {
     eventMap = events.filter(e => {
       if(e.title === title){ return e }
      })
      res.status(200).json(eventMap);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/create-event", (req, res) => {
    let { title, start, end, day } = req.body;
    
    const events = new Events ({ title, start, end, day });

    events.save()
        .then(e => {
            res.status(201).json(e);
        })
        .catch(err => res.status(500).json(err));
});

router.put("/update-event", (req, res) => {
    const { id } = req.body;
    let update = req.body.update;
  
    Events.findByIdAndUpdate(id, update)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json("Error updating the event", err);
      });
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
