/* Importação de dependencias */
const Mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");

/* Importação de constants */
const AppConstants = require("../constants/app");

/* */
var ServicosSchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
      required: [true, "não pode ser vazio"]
    }
  },
  { timestamps: true }
);

/* Registra plugin para o model. */
ServicosSchema.plugin(UniqueValidator, { mensagem: "já existe" });

/* Sanitiza nome de Serviço para não conter acentuações. */
ServicosSchema.methods.removerAcentuacao = function() {
  return this.nome.replace(/[\u0300-\u036f]/g, "");
};

/* Sanitiza nome de Serviço para não conter espaços e pontuações. */
ServicosSchema.methods.removerEspacoPontuacao = function() {
  return this.nome.replace(/[^a-zA-Z0-9]/g, "");
};

Mongoose.model("Servicos", ServicosSchema);
