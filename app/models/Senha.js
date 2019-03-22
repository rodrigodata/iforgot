/* Importação de dependencias */
const Mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

/* Importação de constants */
const AppConstants = require("../constants/app");

/* Schema referente a criacao de uma senha */
var SenhaSchema = new Mongoose.Schema(
  {
    usuario: {
      type: String,
      required: [true, "não pode ser vazio"],
      createIndexes: true
    },
    descricao: {
      type: String,
      required: [true, "não pode ser vazio"]
    },
    servico: { type: Mongoose.Schema.Types.ObjectId, ref: "Servicos" },
    mfa: {
      type: Boolean,
      required: [true, "não pode ser vazio"]
    },
    senha: {
      type: String,
      required: [true, "não pode ser vazio"]
    },
    tipoNotificacao: {
      type: Number
    },
    descricaoNotificacao: {
      type: String
    }
  },
  { timestamps: true }
);

/* ATENÇÃO: EVITAR USO DE ARROW FUNCTIONS. VER MAIS DETALHES EM https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20&%20closures/apC.md#appendix-c-lexical-this */
SenhaSchema.methods.formataRespostaJSON = function() {
  return {
    usuario: this.usuario,
    descricao: this.descricao,
    servico: this.servico,
    mfa: this.mfa,
    tipoNotificacao: this.tipoNotificacao,
    descricaoNotificacao: this.descricaoNotificacao
  };
};

/* Método responsável em gerar senha aleatóriamente. */
SenhaSchema.methods.geradorSenha = function(senhaTamanhoCustomizado) {
  const senhaGerada = Array(
    senhaTamanhoCustomizado || AppConstants.SENHA_TAMANHO
  )
    .fill(AppConstants.DICIONARIO)
    .map(function(x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join("");
  this.criptografarSenha(senhaGerada);
};

/* Método responsável por criptografar senha gerada pelo método geradorSenha. */
SenhaSchema.methods.criptografarSenha = function(senhaGerada) {
  this.senha = CryptoJS.AES.encrypt(senhaGerada, AppConstants.SECRET_API);
};

/* Método responsável por descriptograr senha e que torna possível visualiza-la novamente. */
SenhaSchema.methods.descriptografarSenha = function() {
  const bytes = CryptoJS.AES.decrypt(this.senha, AppConstants.SECRET_API);
  return bytes.toString(CryptoJS.enc.Utf8);
};

Mongoose.model("Senha", SenhaSchema);
