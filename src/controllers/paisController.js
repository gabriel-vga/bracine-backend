const express = require('express');

const Pais = require('../models/Pais');

const router = express.Router();

router.post('/', async (req, res) => {
    const { nome } = req.body;
    try {
        if (await Pais.findOne({ nome }))
            return res.status(400).send({ error: 'País já cadastrado' });

        const pais = await Pais.create(req.body);

        return res.send({ pais });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar país' });
    }
});

router.get('/', async (req, res) => {
    try {
        const paises = await Pais.find()
        res.status(200).json(paises)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar países' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const pais = await Pais.findOne({ _id: id })

        if(!pais){
            res.status(422).json({ error: "País não encontrado" })
            return
        }

        res.status(200).json(pais)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar país' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { nome } = req.body

    const pais = {
        nome
    }

    try {
        
        const updatedPais = await Pais.updateOne({_id: id}, pais)

        if(updatedPais.matchedCount === 0){
            res.status(422).json({ message: 'O país não foi encontrado!' })
            return
        }

        res.status(200).json(pais)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar país' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const pais = await Pais.findOne({ _id: id })

    if(!pais){
        res.status(422).json({ error: "País não encontrado" })
        return
    }

    try {
        await Pais.deleteOne({ _id: id })

        res.status(200).json({ message: 'País removido com sucesso!'})
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar país' });
    }
});

module.exports = app => app.use('/pais', router);