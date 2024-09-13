const express = require("express");
const Postagem = require("../models/Postagem");
const Usuario = require("../models/Usuario");
const postagemSchema = require("../validators/postagemValidator");

const router = express.Router();

// Criar Postagem
router.post("/", async (req, res) => {
  try {
    const { usuarioId } = req.body;
    const usuario = await Usuario.findById(usuarioId);

    if (
      !usuario ||
      (usuario.papel !== "autor" && usuario.papel !== "administrador")
    ) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const parsedData = postagemSchema.parse(req.body);
    const postagem = new Postagem(parsedData);
    await postagem.save();
    res.status(201).json(postagem);
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
});

// Listar Postagens por Autor
router.get("/", async (req, res) => {
  try {
    const { autor } = req.query;
    const postagens = await Postagem.find({ autor }).populate("autor", "nome");
    res.status(200).json(postagens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
