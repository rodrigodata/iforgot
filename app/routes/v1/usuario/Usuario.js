/* Importação de dependencias */
const router = require("express").Router();

/* Importação de middlewares */
const SchemaValidator = require("../../../middlewares/SchemaValidation");

/* Importação Controllers */
const UsuarioController = require("../../../controllers/usuario/Usuario");

/* Responsável pela criação do registro de senha e pela busca páginada de registros */
router
  .route("/usuario")
  .get()
  .post(SchemaValidator(true), UsuarioController.criar);

module.exports = router;
