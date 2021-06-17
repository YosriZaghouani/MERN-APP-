const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;
const {Schema} = mongoose;

const sessionSchema = new Schema(
  {
    paymentLimit: String,
    launchLimit: String,
    restDate: String,
    launchDate: String,
    sessionDate: String,
    isLaunched: Boolean,
    peopleInterrested: [Object],
    reservationDemand : [Object],
    experienceId: {
      type: ObjectId,
      ref: 'Experience',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Session', sessionSchema);
