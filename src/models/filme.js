const mongoose = require('../database');

const FilmeSchema = new mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        required: true,
    },
    ano: {
        type: Number,
        required: false,
    },
    diretor: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Diretor',
        required: false,
    },
    genero: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Genero',
        required: false,
    },
    pais: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Pais',
        required: false,
    },
    roteirista: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'Roteirista',
        required: false,
    },
    arquivo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arquivo',
        required: false,
    },
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poster',
        required: false,
    },
    sinopse: {
        type: String,
        unique: true,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Filme = mongoose.model('Filme', FilmeSchema, 'filmes');

module.exports = Filme;