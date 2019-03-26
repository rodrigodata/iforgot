const SenhaSchemaValidation = require("./evento/Senha");
const ServicoSchemaValidation = require("./servico/Servico");

module.exports = {
  ...SenhaSchemaValidation,
  ...ServicoSchemaValidation
};
