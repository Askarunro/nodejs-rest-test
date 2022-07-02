const {Schema, model} = require('mongoose');
const Joi = require("joi");
const gravatar = require('gravatar');

const schemaRegister = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().min(3).max(8),
  });

  const schemaLogin = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  });

const users = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
      type: String,
      default: function(){
        return gravatar.url(this.email,{}, true)
      }
    },
    token: String
  })

  const Users = model("users", users);

module.exports = {Users, schemaRegister, schemaLogin};