const multer = require("multer");
const { TEMP_DIR } = require("../helpers/consts");
const uploadError = { status: 400, message: "Wrong format" };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(next(uploadError));
    }
  },
}).single("avatar");

module.exports = {
  upload,
};
