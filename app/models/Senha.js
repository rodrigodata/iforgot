/* Importação de dependencias */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');

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
        salt: {
            type: String,
            required: [true, 'não pode ser vazio']
        },
        hash: {
            type: String,
            required: [true, 'não pode ser vazio'],
            maxlength: 1024
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

/**
 * Método responsável por criar o Salt e a Hash de senha.
 * Usamos o Salt para gerar a hash, juntamente com a senha gerada e outras configurações.
 */
SenhaSchema.methods.geradorSaltHash = function(senha) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(senha, this.salt, 10000, 512, 'sha512')
        .toString('hex');
};

/* Método responsável em gerar senha aleatóriamente. */
SenhaSchema.methods.geradorSenha = function(senhaTamanhoCustomizado) {
    const senhaDicionario = AppConstants.DICIONARIO;
    const senhaTamanho = senhaTamanhoCustomizado || 15;

    this.geradorSaltHash(
        Array(senhaTamanho)
            .fill(senhaDicionario)
            .map(function(x) {
                return x[Math.floor(Math.random() * x.length)];
            })
            .join('')
    );
};

mongoose.model('Senha', SenhaSchema);
