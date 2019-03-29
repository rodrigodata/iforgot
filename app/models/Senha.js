/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Importação de Plugins */
const SenhaPlugin = require("../plugins/Senha.plugin");

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
    servico: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Servico",
      unique: true
    },
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

/* Importação de Plugins */
SenhaSchema.plugin(SenhaPlugin);

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

Mongoose.model("Senha", SenhaSchema);
