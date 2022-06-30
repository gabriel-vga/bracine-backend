const express = require('express');

const Diretor = require('../models/Diretor');

const router = express.Router();

router.post('/', async (req, res) => {
    const { nome } = req.body;
    try {
        if (await Diretor.findOne({ nome }))
            return res.status(400).send({ error: 'Diretor já cadastrado' });

        const diretor = await Diretor.create(req.body);

        return res.send({ diretor });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar diretor' });
    }
});

router.get('/', async (req, res) => {
    try {
        const diretores = await Diretor.find()
        res.status(200).json(diretores)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar diretores' });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const diretor = await Diretor.findOne({ _id: id })

        if(!diretor){
            res.status(422).json({ error: "Diretor não encontrado" })
            return
        }

        res.status(200).json(diretor)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar diretor' });
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { nome, anoNascimento } = req.body

    const diretor = {
        nome, 
        anoNascimento
    }

    try {
        
        const updatedDiretor = await Diretor.updateOne({_id: id}, diretor)

        if(updatedDiretor.matchedCount === 0){
            res.status(422).json({ message: 'O diretor não foi encontrado!' })
            return
        }

        res.status(200).json(diretor)
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar diretor' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const diretor = await Diretor.findOne({ _id: id })

    if(!diretor){
        res.status(422).json({ error: "Diretor não encontrado" })
        return
    }

    try {
        await Diretor.deleteOne({ _id: id })

        res.status(200).json({ message: 'Diretor removido com sucesso!'})
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar diretor' });
    }
});

module.exports = app => app.use('/diretor', router);