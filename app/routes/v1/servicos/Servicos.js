/* Importação de dependencias */
const router = require('express').Router();

/* Importação de middlewares */
const SchemaValidator = require('../../../middlewares/SchemaValidation');

/* Importação Controllers */
const ServicosController = require('../../../controllers/servicos/Servicos');

/* Responsável pela criação do registro de senha e pela busca páginada de registros */
router
    .route('/servicos')
    .get()
    .post(SchemaValidator(true), ServicosController.criar);

module.exports = router;
