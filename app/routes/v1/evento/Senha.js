/* Importação de dependencias */
const mongoose = require('mongoose');
const router = require('express').Router();

/* Importação de middlewares */
const SchemaValidator = require('../../../middlewares/SchemaValidation');

/* Importação Controllers */
const SenhaController = require('../../../controllers/evento/Senha');

/* Responsável pela criação do registro de senha e pela busca páginada de registros */
router
    .route('/senha')
    .get()
    .post(SchemaValidator(true), SenhaController.criar);

/* Responsável pela busca e update de um determinado registro de senha a partir do seu id */
router
    .route('/senha/:id')
    .get(SenhaController.buscarPorId)
    .put();

module.exports = router;
