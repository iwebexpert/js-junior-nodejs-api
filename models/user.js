const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  // versionKey: false,
  optimisticConcurrency: true,
});

userSchema.pre('save', function(next){
  if(this.isModified('password')){
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;