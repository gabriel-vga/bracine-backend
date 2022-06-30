const mongoose = require("../database");

const PosterSchema = new mongoose.Schema({
  enderecoArquivo: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Poster = mongoose.model("Poster", PosterSchema, "posters");
module.exports = Poster;
