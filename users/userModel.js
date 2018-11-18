const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String,
    required: true,
    minlength: 6
  },
  classType: {
    conversation: Number,
    accent: Number
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
});

userSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10).then(hash => {
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, function(err, isValid) {
    if (err) {
      return callback(err);
    }
    callback(null, isValid);
  });
};

module.exports = mongoose.model("User", userSchema);
