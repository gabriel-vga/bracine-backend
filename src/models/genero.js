const mongoose = require('../database');

const GeneroSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Genero = mongoose.model('Genero', GeneroSchema, 'generos');

module.exports = Genero;