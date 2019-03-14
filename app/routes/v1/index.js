/* Importação de dependencias */
const router = require('express').Router();

/* Importação de rotas principais. Arquivos em que contenham ela serão rotas "filhas". */
router.use('/evento', require('./evento/senha'));

module.exports = router;
