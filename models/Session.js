const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  login_time: {
    type: String,
    default: new Date().getTime()
  }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
