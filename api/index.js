const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const { get, getById, create, update, updateStatus, remove } = require("../controller");

router.get("/", auth, get);

router.get("/:contactId", auth, getById);

router.post("/", auth, create);

router.put("/:contactId", auth, update);

router.patch("/:contactId/favorite", auth, updateStatus);

router.delete("/:contactId", auth, remove);

module.exports = router;
