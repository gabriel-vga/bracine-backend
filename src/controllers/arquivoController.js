const express = require("express");

const Arquivo = require("../models/Arquivo");

const router = express.Router();

const uploadFilme = require("../middleware/filmeMulter");

router.post("/", uploadFilme.single("file"), function (req, res) {
  try {
    const arquivo = new Arquivo({
      enderecoArquivo: "/filmes/" + req.file.filename,
    });
    arquivo.save();
    res.end("Arquivo de filme cadastrado!");
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Erro ao cadastrar arquivo de filme" });
  }
});

router.post("/", async (req, res) => {
  const { enderecoArquivo } = req.body;
  try {
    if (await Arquivo.findOne({ enderecoArquivo }))
      return res.status(400).send({ error: "Arquivo já cadastrado" });

    const arquivo = await Arquivo.create(req.body);

    return res.send({ arquivo });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao cadastrar arquivo" });
  }
});

router.get("/", async (req, res) => {
  try {
    const arquivos = await Arquivo.find();
    res.status(200).json(arquivos);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar arquivos" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const arquivo = await Arquivo.findOne({ _id: id });

    if (!arquivo) {
      res.status(422).json({ error: "Arquivo não encontrado" });
      return;
    }

    res.status(200).json(arquivo);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar arquivo" });
  }
});

router.patch("/:id", uploadFilme.single("file"), function (req, res) {
  try {
    const arquivo = new Arquivo({
      enderecoArquivo: "/filmes/" + req.file.filename,
    });
    arquivo.save();
    res.end("Arquivo de filme atualizado!");
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar arquivo de filme" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const arquivo = await Arquivo.findOne({ _id: id });

  if (!arquivo) {
    res.status(422).json({ error: "Arquivo não encontrado" });
    return;
  }

  try {
    await Arquivo.deleteOne({ _id: id });

    res.status(200).json({ message: "Arquivo removido com sucesso!" });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar arquivo" });
  }
});

module.exports = (app) => app.use("/arquivo", router);
