const mongoose = require('../database');

const RoteiristaSchema = new mongoose.Schema({
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

const Roteirista = mongoose.model('Roteirista', RoteiristaSchema, 'roteiristas');

module.exports = Roteirista;