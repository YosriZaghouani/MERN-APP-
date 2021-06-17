const mongoose = require('mongoose');
const User = require('../../userService/model/User');
const Experiences = require('../models/Experience');
const Session = require('../models/Session');
const Sessions = require('../models/Session');

mongoose.set('useFindAndModify', false);

// Filter, sorting and paginating jjsdhjqhdq
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = {...this.queryString}; // queryString = req.query

    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => `$${match}`);

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const experienceController = {
  getExperiences: async (req, res) => {
    try {
      // console.log(req.query)
      const features = new APIfeatures(Experiences.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const experiences = await features.query;

      res.json({
        status: 'success',
        experiencesCount: experiences.length,
        experiences,
      });

      // console.log(experiences)
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  createExperience: async (req, res) => {
    try {
      // admin and user can create, delete and update "experiences créées"
      const {
        userID,
        type,
        sessions,
        title,
        activity,
        startHour,
        endHour,
        language,
        city,
        themes,
        difficulty,
        program,
        target,
        phobia,
        includedEq,
        excludedEq,
        price,
        status,
        limitParticipants,
        user,
      } = req.body;

      const newExperience = new Experiences({
        userID,
        user,
        type,
        sessions,
        title,
        activity,
        startHour,
        endHour,
        language,
        city,
        themes,
        difficulty,
        program,
        target,
        phobia,
        includedEq,
        excludedEq,
        price,
        status,
        limitParticipants,
      });

      await newExperience.save();
      const searchedUser = await User.findByIdAndUpdate(
        req.body.userID,
        {$push: {myExperiences: newExperience}},
        {new: true, useFindAndModify: false}
      );
      const experience = await Experiences.findByIdAndUpdate(
        newExperience._id,
        {user: searchedUser},
        {new: true, useFindAndModify: false}
      );
      return res.json({experience, searchedUser});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  // Delete experience => /api/experience/:id
  deleteExperience: async (req, res) => {
    try {
      await Experiences.findByIdAndDelete(req.params.id);
      res.json({msg: 'Expérience supprimée avec succès'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  updateExperience: async (req, res) => {
    try {
      const {
        type,
        sessions,
        title,
        activity,
        startHour,
        endHour,
        language,
        city,
        themes,
        difficulty,
        program,
        target,
        phobia,
        includedEq,
        excludedEq,
        price,
        status,
        limitParticipants,
        photo,
        photo2,
        photo3,
        photo4,
        user,
      } = req.body;
      await Experiences.findByIdAndUpdate(
        {_id: req.params.id},
        {
          type,
          sessions,
          title,
          activity,
          startHour,
          endHour,
          language,
          city,
          themes,
          difficulty,
          program,
          target,
          phobia,
          includedEq,
          excludedEq,
          price,
          status,
          limitParticipants,
          photo,
          photo2,
          photo3,
          photo4,
          user,
        },
        {new: true}
      );
      res.json({msg: "L'expérience a été modifié avec succès"});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getSingleExperience: async (req, res) => {
    try {
      const experience = await Experiences.findById(req.params.id);
      res.json({status: 'success', experience});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  addSession: async (req, res) => {
    try {
      const {
        paymentLimit,
        launchLimit,
        restDate,
        launchDate,
        sessionDate,
        isLaunched,
        peopleInterrested,
        experienceId,
        reservationDemand,
      } = req.body;
      const newSession = new Session({
        paymentLimit,
        launchLimit,
        restDate,
        launchDate,
        sessionDate,
        isLaunched,
        peopleInterrested,
        experienceId,
        reservationDemand,
      });
      await newSession.save();
      const searchedExperience = await Experiences.findOneAndUpdate(
        {
          _id: experienceId,
        },
        {$push: {sessions: newSession}},
        {new: true}
      ).populate('sessions');
      res.json({
        msg: 'La session a été ajouté avec succès',
        newSession,
        searchedExperience,
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getSingleSession: async (req, res) => {
    try {
      const {sessionId} = req.body;
      const session = await Sessions.findById(sessionId);
      res.json({status: 'success', session});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  updateSession: async (req, res) => {
    try {
      const {
        sessionId,
        paymentLimit,
        launchLimit,
        restDate,
        launchDate,
        sessionDate,
        isLaunched,
        peopleInterrested,
        experienceId,
        reservationDemand,
      } = req.body;

      await Sessions.findByIdAndUpdate(
        {_id: sessionId},
        {
          paymentLimit,
          launchLimit,
          restDate,
          launchDate,
          sessionDate,
          isLaunched,
          peopleInterrested,
          experienceId,
          reservationDemand,
        }
      );

      res.json({msg: 'La session a été modifié avec succès'});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
};

module.exports = experienceController;
