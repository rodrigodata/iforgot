const SenhaSchemaValidation = require('./evento/Senha');
const ServicosSchemaValidation = require('./servicos/Servicos');

module.exports = {
    ...SenhaSchemaValidation,
    ...ServicosSchemaValidation
};
