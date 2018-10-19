const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  package: {
    classes: [String]
  },
  validate: [classLimit, 'exceeded class limit'] 
});

const classLimit = (val) => {
  return val.length <= 5;
}

module.exports = mongoose.model("Event", eventSchema);