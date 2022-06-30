const mongoose = require('../database');

const DiretorSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        required: true,
    },
    anoNascimento: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Diretor = mongoose.model('Diretor', DiretorSchema, 'diretors');

module.exports = Diretor;