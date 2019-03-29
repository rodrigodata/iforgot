const DB_HOST = process.env.IFORGOT_DB_HOST;
const SECRET_API = process.env.SECRET_API;
const DICIONARIO = process.env.IFORGOT_DICTIONARY;
const TELEGRAM_TOKEN = process.env.IFORGOT_TELEGRAM_TOKEN;
const SENHA_TAMANHO = 12;

/* Valor padrão de período em quanto tempo deve ser modificado a senha dos serviços */
const VENCIMENTO_SENHA = {
  QUANTIDADE: 3,
  TIPO: "months"
};

module.exports = {
  DB_HOST,
  DICIONARIO,
  SECRET_API,
  TELEGRAM_TOKEN,
  SENHA_TAMANHO,
  VENCIMENTO_SENHA
};
