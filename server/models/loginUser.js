const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// set up a mongoose model
const LoginSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  location: String,
  role: String,
  team: [String],
  comment: String,
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

LoginSchema.methods.fullname = (firstName, lastName) => {
  return capitalize(firstName) + ' ' + capitalize(lastName);
};

LoginSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

LoginSchema.methods.validPassword = (password, this_password) => {
  return bcrypt.compareSync(password, this_password)
}

module.exports = mongoose.model('Login', LoginSchema);