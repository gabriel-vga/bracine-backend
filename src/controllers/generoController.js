const express = require('express');

const Genero = require('../models/Genero');

const router = express.Router();

router.post('/', async (req, res) => {
    const { nome } = req.body;
    try {
        if (await Genero.findOne({ nome }))
            return res.status(400).send({ error: 'Gênero já cadastrado' });

        const genero = await Genero.create(req.body);

        return res.send({ genero });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar genero' });
    }
});

router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find()
        res.status(200).json(generos)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar gêneros' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const genero = await Genero.findOne({ _id: id })

        if(!genero){
            res.status(422).json({ error: "Gênero não encontrado" })
            return
        }

        res.status(200).json(genero)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar genero' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { nome } = req.body

    const genero = {
        nome
    }

    try {
        
        const updatedGenero = await Genero.updateOne({_id: id}, genero)

        if(updatedGenero.matchedCount === 0){
            res.status(422).json({ message: 'O genero não foi encontrado!' })
            return
        }

        res.status(200).json(genero)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar genero' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const genero = await Genero.findOne({ _id: id })

    if(!genero){
        res.status(422).json({ error: "Gênero não encontrado" })
        return
    }

    try {
        await Genero.deleteOne({ _id: id })

        res.status(200).json({ message: 'Gênero removido com sucesso!'})
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar genero' });
    }
});

module.exports = app => app.use('/genero', router);