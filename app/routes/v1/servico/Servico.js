/* Importação de dependencias */
const router = require("express").Router();

/* Importação de middlewares */
const SchemaValidator = require("../../../middlewares/SchemaValidation");

/* Importação Controllers */
const ServicoController = require("../../../controllers/servico/Servico");

/* Responsável pela criação do registro de senha e pela busca páginada de registros */
router
  .route("/servico")
  .get()
  .post(SchemaValidator(true), ServicoController.criar);

module.exports = router;
