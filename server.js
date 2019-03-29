/* Importação de dependencias */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

/* Importação Serviço do Telegram. Com ele, iniciamos o bot juntamente com a nossa aplicação. */
const Telegram = require("./app/services/Telegram");

/* Importação Crons. Com isso, iniciamos a Cron juntamente com a nossa aplicação. */
const Cron = require("./app/services/SenhasVencidas");

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

/* Inicia Cron */
Cron.iniciarCron();

var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Escutando na porta " + server.address().port);
});
