const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  birthday: {
    type: Date,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  photo: {
    type: String,
  },
  myPreferences: [
    {
      type: ObjectId,
      ref: 'preferences',
    },
  ],
  verif: {type: Boolean, default: false},
  falseIdentity: {type: Boolean, default: true},
  myExperiences: [
    {
      type: ObjectId,
      ref: 'Experience',
    },
  ],
});

module.exports = User = mongoose.model('user', userSchema);
