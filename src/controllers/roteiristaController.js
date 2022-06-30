const express = require('express');

const Roteirista = require('../models/Roteirista');

const router = express.Router();

router.post('/', async (req, res) => {
    const { nome } = req.body;
    try {
        if (await Roteirista.findOne({ nome }))
            return res.status(400).send({ error: 'Roteirista já cadastrado' });

        const roteirista = await Roteirista.create(req.body);

        return res.send({ roteirista });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar roteirista' });
    }
});

router.get('/', async (req, res) => {
    try {
        const roteiristas = await Roteirista.find()
        res.status(200).json(roteiristas)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar roteiristas' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const roteirista = await Roteirista.findOne({ _id: id })

        if(!roteirista){
            res.status(422).json({ error: "Roteirista não encontrado" })
            return
        }

        res.status(200).json(roteirista)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar roteirista' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { nome, anoNascimento } = req.body

    const roteirista = {
        nome, 
        anoNascimento
    }

    try {
        
        const updatedRoteirista = await Roteirista.updateOne({_id: id}, roteirista)

        if(updatedRoteirista.matchedCount === 0){
            res.status(422).json({ message: 'O roteirista não foi encontrado!' })
            return
        }

        res.status(200).json(roteirista)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar roteirista' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const roteirista = await Roteirista.findOne({ _id: id })

    if(!roteirista){
        res.status(422).json({ error: "Roteirista não encontrado" })
        return
    }

    try {
        await Roteirista.deleteOne({ _id: id })

        res.status(200).json({ message: 'Roteirista removido com sucesso!'})
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar roteirista' });
    }
});

module.exports = app => app.use('/roteirista', router);