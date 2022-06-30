const express = require('express');

const Admin = require('../models/admin');

const router = express.Router();

router.post('/cadastro-admin', async (req, res) => {
    const { email } = req.body;
    try {
        if (await Admin.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já cadastrado' });

        const admin = await Admin.create(req.body);

        admin.senha = undefined;

        return res.send({ admin });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao cadastrar usuário' });
    }
});

module.exports = app => app.use('/auth', router);