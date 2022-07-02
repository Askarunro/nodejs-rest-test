const {Contacts} = require("./schemas/contacts");

const getAllContacts = async () => {
  return Contacts.find();
};

const getContactById = (contactId) => {
  return Contacts.findOne({ _id: contactId });
};

const createContact = (contact, id) => {
  return Contacts.create({...contact, owner: id});
};

const updateContact = (contactId, fields) => {
  return Contacts.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

const removeContact = (contactId) => {
  return Contacts.findByIdAndRemove({ _id: contactId });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
