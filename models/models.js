const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
nome: { type: String, required: true },
email: { type: String, required: true, unique: true },
senha: { type: String, required: true },
imagem: { type: String },
papel: { type: String, enum: ['administrador', 'autor', 'leitor'], default: 'leitor' },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
