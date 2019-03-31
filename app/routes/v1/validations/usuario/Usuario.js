/* Importação de dependencias */
const Joi = require("joi");

/* Validação da rota */
const CriarUsuarioSchema = Joi.object({
  usuario: Joi.string()
    .lowercase()
    .required(),
  senha: Joi()
    .string()
    .required()
});

module.exports = {
  "/usuario": CriarUsuarioSchema
};
