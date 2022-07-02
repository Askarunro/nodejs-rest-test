const {Schema, model} = require('mongoose');
const Joi = require("joi");

const schemaUpdate = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(13),
    favorite: Joi.boolean(),
  });

const schemaUpdateFavorite = Joi.object({
  favorite: Joi.boolean(),
})

const contacts = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
});

const Contacts = model("contacts", contacts);

module.exports = {Contacts, schemaUpdate, schemaUpdateFavorite};
