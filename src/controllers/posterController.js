const express = require("express");

const app = express();

const Poster = require("../models/Poster");

const router = express.Router();

const uploadPoster = require("../middleware/posterMulter");

router.post("/", uploadPoster.single("file"), function (req, res) {
  try {
    const poster = new Poster({
      enderecoArquivo: "/posters/" + req.file.filename,
    });
    poster.save();
    res.end("Pôster cadastrado!");
  } catch (err) {
    return res.status(400).send({ error: "Erro ao cadastrar pôster" });
  }
});

router.get("/", async (req, res) => {
  try {
    const posters = await Poster.find();
    res.status(200).json(posters);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar pôsteres" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const poster = await Poster.findOne({ _id: id });

    if (!poster) {
      res.status(422).json({ error: "Pôster não encontrado" });
      return;
    }

    res.status(200).json(poster);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar pôster" });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { enderecoArquivo } = req.body;

  const poster = {
    enderecoArquivo,
  };

  try {
    const updatedPoster = await Poster.updateOne({ _id: id }, poster);

    if (updatedPoster.matchedCount === 0) {
      res.status(422).json({ message: "O pôster não foi encontrado!" });
      return;
    }

    res.status(200).json(poster);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar pôster" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const poster = await Poster.findOne({ _id: id });

  if (!poster) {
    res.status(422).json({ error: "Pôster não encontrado" });
    return;
  }

  try {
    await Poster.deleteOne({ _id: id });

    res.status(200).json({ message: "Pôster removido com sucesso!" });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar pôster" });
  }
});

module.exports = (app) => app.use("/poster", router);
