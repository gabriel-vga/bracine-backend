const mongoose = require('../database');

const PaisSchema = new mongoose.Schema({
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

const Pais = mongoose.model('Pais', PaisSchema, 'pais');

module.exports = Pais;