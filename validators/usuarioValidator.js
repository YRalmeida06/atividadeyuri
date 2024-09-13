const { z } = require('zod');

const usuarioSchema = z.object({
nome: z.string().min(1, "Nome é obrigatório"),
email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres").regex(/(?=.*[A-Za-z])(?=.*\d)/, "Senha deve conter letras e números"),
imagem: z.string().optional(),
papel: z.enum(['administrador', 'autor', 'leitor']).optional(),
});

module.exports = usuarioSchema;
