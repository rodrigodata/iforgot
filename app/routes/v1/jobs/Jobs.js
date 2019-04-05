/* Importação de dependencias */
const router = require("express").Router();

/* Importação Controllers */
const JobsController = require("../../../controllers/jobs/Jobs");

/* Responsável pela criação do registro de senha e pela busca páginada de registros */
router
    .route("/jobs")
    .get(JobsController.buscar);

module.exports = router;
