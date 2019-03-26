/* Importação de dependencias */
const Joi = require("Joi");

/* Validação da rota */
const CriarServicoSchema = Joi.object({
  nome: Joi.string()
    .lowercase()
    .required()
});

module.exports = {
  "/servico": CriarServicoSchema
};
