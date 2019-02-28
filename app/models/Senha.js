/* Importação de dependencias */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var SenhaSchema = new mongoose.Schema(
    {
        usuario: {
            type: String,
            lowercase: true,
            required: [true, 'não pode ser vazio'],
            createIndexes: true
        },
        descricao: {
            type: String,
            lowercase: true,
            required: [true, 'não pode ser vazio']
        },
        tipoNotificacao: {
            type: Number
        },
        descricaoNotificacao: {
            type: String
        }
    },
    {timestamps: true}
);

/* ATENÇÃO: EVEITAR USO DE ARROW FUNCTIONS. VER MAIS DETALHES EM https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/apC.md#appendix-c-lexical-this */
SenhaSchema.methods.formataRespostaJSON = function() {
    return {
        usuario: this.usuario,
        descricao: this.descricao,
        tipoNotificacao: this.tipoNotificacao,
        descricaoNotificacao: this.descricaoNotificacao
    };
};

mongoose.model('Senha', SenhaSchema);
