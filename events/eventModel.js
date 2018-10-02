const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

module.exports = mongoose.model("Event", eventSchema);