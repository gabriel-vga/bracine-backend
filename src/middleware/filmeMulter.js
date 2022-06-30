const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = "./public/filmes";
    cb(null, path);
  },
  filename: function (req, file, cb) {
    let nome = file.originalname;
    cb(null, nome);
  },
});

var upload = multer({ storage });

module.exports = upload;
