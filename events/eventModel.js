const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);