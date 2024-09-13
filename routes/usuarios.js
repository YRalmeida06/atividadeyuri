const express = require("express");
const Usuario = require("../models/Usuario");
const usuarioSchema = require("../validators/usuarioValidator");

const router = express.Router();

// Registro de Usuário
router.post("/registro", async (req, res) => {
  try {
    const parsedData = usuarioSchema.parse(req.body);
    const usuario = new Usuario(parsedData);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Atualização de Perfil
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const parsedData = usuarioSchema.omit({ email: true }).parse(req.body); // Não permitir mudança de email
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (req.body.email && (await Usuario.findOne({ email: req.body.email }))) {
      return res.status(400).json({ error: "Email já está em uso" });
    }

    Object.assign(usuario, parsedData);
    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

module.exports = router;
