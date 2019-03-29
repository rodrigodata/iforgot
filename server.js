/* Importação de dependencias */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

/* Importação Serviço do Telegram. Com ele, iniciamos o bot juntamente com a nossa aplicação. */
const Telegram = require("./app/services/Telegram");

/* Configuração Express */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Importacao conexao banco de dados */
require("./database");

/* Importação dos models */
require("./app/models");

/* Configurando para usar rotas */
app.use(require("./app/routes"));

/* Inicia o bot */
Telegram.iniciarBot();

var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Escutando na porta " + server.address().port);
});
