const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;
const {Schema} = mongoose;

const sessionSchema = new Schema(
  {
    session: {
      id: ObjectId,
      paymentLimit: String,
      lunchLimit: String,
      restDate: String,
      launchDate: String,
      sessionDate: String,
      islunched: {Boolean, default: false},
      peopleInterrested: [Object],
      experienceId: {
        type: ObjectId,
        ref: 'Experience',
      },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Session', sessionSchema);
