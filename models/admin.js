const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const _ = require('lodash');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  email:{
    type: String, required: true, unique: true,trim: true,
    validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
        }
    },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean,
  user_type: {
    type: String,
    lowercase: true,
    trim: true
  },
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
  },
  phone: { type: String, default: null},
  regNo: String,
  profile_photo_url: { type: String, default: null },
  active: Boolean,
  OS: String,
  verified_user: Boolean,
  deactivate_user: { type: Boolean, default: false },
  country_code: String,
  verification_code: String,
  palyer_id: String,
  access_code: String,
  last_shared_loc_time: { type: Date, default: Date.now },
  speedLimit: { type: Number, default: 0},
  onesignalid: { type: String, default: null }
  // role: [],
  // operations: []
}, { timestamps: true });

adminSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

// function validateUser(user) {
//   const schema = {
//     name: Joi.string().min(5).max(50).required(),
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required(),
//     user_type: Joi.string().min(5).max(15)
//   };

//   return Joi.validate(user, schema);
// }

// const Admin = mongoose.model('Admin', adminSchema);
module.exports.Admin =mongoose.model('Admin', adminSchema);
// module.exports.validate = validateUser;