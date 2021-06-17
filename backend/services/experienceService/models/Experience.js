const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;
const {Schema} = mongoose;

const experienceSchema = new Schema(
  {
    // type
    type: {
      title: {type: String}, // en ligne ou en personne
      location: String, // si type de l'expérience est en personne
      assemblyPoint: String, // si type de l'expérience est en personne
      zoom: String, // si type de l'expérience est en ligne
    },
    sessions: [
      {
        type: Object,
        ref: 'Session',
      },
    ],

    // titre
    title: {
      type: String,
    },
    // activité
    activity: {
      type: String,
      trim: true,
    },
    // heure début
    startHour: {
      type: String,
    },
    // heure fin
    endHour: {
      type: String,
    },
    // langues
    language: {type: String},
    // ville
    city: {type: String},
    // Thèmes
    themes: {type: [String]},
    // difficulte
    difficulty: String,
    // description du programme
    program: {
      generalDesc: String,
      activityDesc: String,
    },
    // cibles
    target: {type: [String]},
    // phobies
    phobia: {type: [String]},
    // equipements inclus
    includedEq: {
      type: {
        food: String,
        drink: String,
        material: String,
      },
    },
    // equipements exclus
    excludedEq: {
      type: {
        food: String,
        drink: String,
        material: String,
      },
    },
    // prix
    price: {
      type: Number,
      trim: true,
    },
    status: String,
    limitParticipants: {type: Number},
    userID: ObjectId,
    user: Object,
    photo: {
      type: String,
    },
    photo2: {
      type: String,
    },
    photo3: {
      type: String,
    },
    photo4: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Experience', experienceSchema);
