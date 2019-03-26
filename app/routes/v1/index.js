/* Importação de dependencias */
const router = require("express").Router();

/* Importação de rotas principais. Arquivos em que contenham ela serão rotas "filhas". */
router.use("/evento", require("./evento"));

/**
 * Quando o endpoint que estamos trabalhando é o do pai, precisamos dizer para o express
 * que o seu endpoint é o atual. Ou seja, '/'. Abaixo temos o exemplo da rota v1/servico que possui POST e GET.
 */
router.use(
  "/",
  require("./evento"),
  require("./servico"),
  require("./usuario")
);

module.exports = router;
