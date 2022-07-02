const fs = require("fs");
const Jimp = require("jimp");
const path = require("path");
const { PUBLIC_DIR, AVATARS } = require("../helpers/consts");

const uploadImage = async (id, file) => {
  const avatarURL = path.join(AVATARS, `${id}${path.extname(file.originalname)}`);
  try {
    await Jimp.read(file.path).then((image) => {
      image.resize(250, 250, (err, image) => {
        image.write(path.join(PUBLIC_DIR, avatarURL));
      });
    });
    return avatarURL;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  uploadImage,
};
