const mongoose = require('mongoose');

const postagemSchema = new mongoose.Schema({
titulo: { type: String, required: true },
conteudo: { type: String, required: true },
autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

module.exports = mongoose.model('Postagem', postagemSchema);
