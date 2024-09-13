const express = require("express");
const mongoose = require("mongoose");
const usuarioRoutes = require("../routes/usuarios");
const postagemRoutes = require("../routes/postagens");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/meu_banco", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/usuarios", usuarioRoutes);
app.use("/postagens", postagemRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
