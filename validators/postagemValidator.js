const { z } = require('zod');

const postagemSchema = z.object({
titulo: z.string().min(1, "Título é obrigatório"),
conteudo: z.string().min(1, "Conteúdo é obrigatório"),
autor: z.string().length(24, "ID do autor inválido"), // Assumindo um ObjectId de 24 caracteres
});

module.exports = postagemSchema;
