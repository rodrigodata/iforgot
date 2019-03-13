/* Importação de dependencias */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/* Importação de constants */
const AppConstants = require('../constants/app');

/* Schema referente a criacao de uma senha */
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
        senha: {
            type: String,
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

/* Método responsável em gerar senha aleatóriamente. */
SenhaSchema.methods.geradorSenha = function(senhaTamanhoCustomizado) {
    const senhaDicionario = AppConstants.DICIONARIO || null;
    const senhaTamanho = senhaTamanhoCustomizado || 15;

    return Array(senhaTamanho)
        .fill(senhaDicionario)
        .map(function(x) {
            return x[Math.floor(Math.random() * x.length)];
        })
        .join('');
};

mongoose.model('Senha', SenhaSchema);
