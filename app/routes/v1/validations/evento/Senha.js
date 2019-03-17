/* Importação de dependencias */
const Joi = require('Joi');

/* Validação da rota */
const CriarSenhaSchema = Joi.object({
    usuario: Joi.string()
        .lowercase()
        .required(),
    descricao: Joi.string().required(),
    mfa: Joi.boolean().required(),
    tipoNotificacao: Joi.number(),
    descricaoNotificacao: Joi.string()
});

module.exports = {
    '/senha': CriarSenhaSchema
};
