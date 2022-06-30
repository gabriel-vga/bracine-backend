const express = require('express');

const Filmes = require('../models/Filme');

const router = express.Router();

router.post('/', async (req, res) => {
    const { nome } = req.body;
    try {
        if (await Filmes.findOne({ nome }))
            return res.status(400).send({ error: 'Filmes já cadastrado' });

        const filmes = await Filmes.create(req.body);

        return res.send({ filmes });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar filme' });
    }
});

router.get('/', async (req, res) => {
    try {
        const filmess = await Filmes.find()
        res.status(200).json(filmess)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar filmes' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const filmes = await Filmes.findOne({ _id: id })

        if(!filmes){
            res.status(422).json({ error: "Filme não encontrado" })
            return
        }

        res.status(200).json(filmes)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar filme' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { nome, ano, diretor, genero, pais, roteirista, poster, sinopse, arquivo } = req.body

    const filmes = {
        nome, ano, diretor, genero, pais, roteirista, poster, sinopse, arquivo
    }

    try {
        
        const updatedFilmes = await Filmes.updateOne({_id: id}, filmes)

        if(updatedFilmes.matchedCount === 0){
            res.status(422).json({ message: 'O filme não foi encontrado!' })
            return
        }

        res.status(200).json(filmes)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar filme' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const filmes = await Filmes.findOne({ _id: id })

    if(!filmes){
        res.status(422).json({ error: "Filme não encontrado" })
        return
    }

    try {
        await Filmes.deleteOne({ _id: id })

        res.status(200).json({ message: 'Filme removido com sucesso!'})
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar filme' });
    }
});

module.exports = app => app.use('/filme', router);