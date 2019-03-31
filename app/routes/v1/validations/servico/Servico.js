/* Importação de dependencias */
const Joi = require("joi");

/* Validação da rota */
const CriarServicoSchema = Joi.object({
  nome: Joi.string()
    .lowercase()
    .required()
});

module.exports = {
  "/servico": CriarServicoSchema
};
