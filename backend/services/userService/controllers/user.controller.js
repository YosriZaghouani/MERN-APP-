const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const cloudinary = require('cloudinary');
const Preferences = require('../model/Preferences');
const User = require('../model/User');

const secretOrkey = config.get('secretOrkey');

// Register User
exports.register = async (req, res) => {
  const {name, email, password, phoneNumber} = req.body;

  try {
    const searchRes = await User.findOne({email});
    if (searchRes)
      return res.status(401).json({msg: `Utilisateur existant , utiliser un autre E-mail`});

    const newUser = new User({
      name,
      email,
      password,
      phoneNumber,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({errors: error});
  }
};

// Login User

exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({msg: `Email ou mot de passe incorrect`});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({msg: `Email ou mot de passe incorrect`});

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    const token = await jwt.sign(payload, secretOrkey);
    return res.status(200).json({token: `Bearer ${token}`, user});
  } catch (error) {
    res.status(500).json({errors: error});
  }
};
// Update User
exports.updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      birthday,
      adress,
      city,
      aboutMe,
      postalCode,
      myPreferences,
      photo,
      verif,
      falseIdentity,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      phoneNumber,
      birthday,
      adress,
      city,
      aboutMe,
      postalCode,
      myPreferences,
      photo,
      verif,
      falseIdentity,
    });

    return res.status(201).json({
      msg: "L'utilisateur a été modifié avec succès",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};

// Handle user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const user = User.findById(req.params.id);
    if (!roles.includes(user.role)) {
      return next(
        res.status(403).json({
          msg: `Role (${user.role}) is not allowed to acces this resource`,
        })
      );
    }
  };
};

// Get all users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      succes: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};

exports.seePreferences = async (req, res) => {
  try {
    const allPreferences = await Preferences.find();
    res.send(allPreferences);
  } catch (error) {
    res.status(500).json({errors: error.message});
  }
};

exports.addPreferences = async (req, res) => {
  const {themes, difficulties, phobies} = req.body;
  try {
    const newPref = new Preferences({
      themes,
      difficulties,
      phobies,
      usersID: req.user,
    });
    await newPref.save();
    res.status(201).json(newPref);
  } catch (error) {
    res.status(500).json({errors: error});
  }
};
// Add Preferences to a User (Themes)
exports.addMyPreferences = async (req, res) => {
  const userId = req.params.id;
  const {preferenceId, preferenceName} = req.body;

  try {
    const searchedUser = await User.findOne({_id: userId});
    console.log(searchedUser);
    searchedUser.myPreferences.push(preferenceId);
    const user = await User.findByIdAndUpdate(userId, searchedUser, {
      new: true,
      useFindAndModify: false,
    }).populate('preferences', 'themes');

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({errors: error.message});
  }
};
// getUserById
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({status: 'success', user});
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};

exports.Paymentvalidation = (req, res) => {
  const history = [];
  const transactionData = {};

  // 1.Put brief Payment Information inside User Collection
  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  // 2.Put Payment Information that come from Paypal into Payment Collection
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    {_id: req.user._id},
    {$push: {history}, $set: {cart: []}},
    {new: true},
    (err, user) => {
      if (err) return res.json({success: false, err});

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({success: false, err});
      });
    }
  );
};
