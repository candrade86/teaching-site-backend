const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Event", eventSchema);