const mongoose = require('../database');

const ArquivoSchema = new mongoose.Schema({
    enderecoArquivo: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Arquivo = mongoose.model('Arquivo', ArquivoSchema, 'arquivos');
module.exports = Arquivo;