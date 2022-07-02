const { getAllContacts, getContactById, createContact, updateContact, removeContact } = require("../service");

const { schemaUpdate, schemaUpdateFavorite } = require("../service/schemas/contacts");

const get = async (req, res, next) => {
  try {
    const results = await getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const results = await getContactById(contactId);
    if (results) {
      res.json({
        status: "success",
        code: 200,
        data: {
          tasks: results,
        },
      });
    } else
      res.json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone || schemaUpdate.validate(req.body).error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `missing required name field`,
      });
    } else {
      const results = await createContact(req.body, _id);
      return res.json({
        status: "success",
        code: 201,
        data: {
          contact: results,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const results = await removeContact(contactId);
    if (results) {
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;

  try {
    if (Object.keys(req.body).length === 0 || schemaUpdate.validate(req.body).error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }
    const result = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });
    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    if (!req.body.favorite || schemaUpdateFavorite.validate(req.body).error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }
    const result = await updateContact(contactId, req.body);
    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
