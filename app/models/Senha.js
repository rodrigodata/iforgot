/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Importação de Plugins */
const SenhaPlugin = require("../plugins/Senha.plugin");

/* Importação Utils */
const DateUtils = require("../lib/DateUtils");

/* Importação Constants */
const Constants = require("../constants/app");

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
    vencimento: {
      type: String, // Caso seja utilizado type Date o próprio Mongoose irá converter para UTC. Por isso está como String.
      required: [true, "não pode ser vazio"]
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
    },
    idChatTelegram: {
      type: Number,
      required: [true, "não pode ser vazio"]
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
    vencimento: this.vencimento,
    servico: this.servico,
    mfa: this.mfa,
    tipoNotificacao: this.tipoNotificacao,
    descricaoNotificacao: this.descricaoNotificacao,
    idChatTelegram: this.idChatTelegram
  };
};

/* Método responsável em gerar data de vencimento de senha a partir de configuração da aplicação. Tempo padrão: 3 meses à partir da sua criação. */
SenhaSchema.methods.gerarVencimentoSenha = function() {
  this.vencimento = DateUtils.adicionarVencimentoDataHorario(
    Constants.VENCIMENTO_SENHA.QUANTIDADE,
    Constants.VENCIMENTO_SENHA.TIPO
  );
};

Mongoose.model("Senha", SenhaSchema);
