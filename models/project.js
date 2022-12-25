const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Гость',
  },
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  // versionKey: false,
  optimisticConcurrency: true,
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;