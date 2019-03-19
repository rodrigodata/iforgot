/* Importação de dependencias */
const Telegraf = require("telegraf");
const Mongoose = require("mongoose");
/* Precisamos importar o contexto dos models para conseguir efetuar consultas ao banco de dados */
require("../models/index");

/* Importação de Constants da aplicação */
const Contants = require("../constants/app");

/* Importação de Middleware */
const TelegramMiddlewareValidation = require("../middlewares/TelegramValidation");

/* Importação de Models */
const Servico = Mongoose.model("Servicos");

const Comandos = {
  bot: {},
  registarMiddlewares() {
    return this.bot.use(TelegramMiddlewareValidation());
  },
  registrarComandos() {
    this.bot.start(context => {
      context.reply("Hello Dave");
    });
    this.consultarServico();
  },
  consultarServico() {
    return this.bot.command("servico", context => {
      /* Descontrução do objeto. */
      const { raw, commandClient, args } = context.state.command;

      /* Validação se algum comando foi informado. */
      if (!args[0] || args[0] == "")
        return context.reply(
          `Nenhum comando informado. Por favor, tente novamente.\nComando informado '${raw}'`
        );

      /* Efetuar busca por serviço. */
      Servico.findOne({ nome: args[0] }, function(err, servico) {
        if (err)
          return context.reply(
            `Ops.. ocorreu um erro ao buscar o serviço '${
              args[0] && args[0] != "" ? args[0].toUpperCase() : ""
            }'`
          );
        if (!servico || !servico.nome)
          return context.reply(
            `Nenhum serviço encontrado. Serviço informado '${args[0]}'`
          );

        return context.reply(servico.nome);
      });
    });
  },
  iniciarBot() {
    /* Cria uma nova instancia do bot. */
    this.bot = new Telegraf(Contants.TELEGRAM_TOKEN);
    /* Registra nosso middleware para formatar comando e texto de conversa */
    this.registarMiddlewares();
    /* Registra todos os comandos usados pelo o nosso bot. */
    this.registrarComandos();
    /* Inicia nosso bot. */
    this.bot.launch();
    /* Info */
    console.log("Bot iniciado com sucesso");
  }
};

module.exports = Comandos;
/**

*******CONSULTA SERVIÇO*******
>/servico twitter 
>Por favor, informe sua senha master..
>isi*8965d)
 
    Serviço: Twitter
    Senha Expira: 05/05/2019 às 16:18
    MFA: true
    Senha: 9Hgjfd&83$
    Data Criação: 11/12/2018 às 16:18
    Data Ultima Atualização: 05/02/2019 às 16:18



*******RESETAR SENHA DE SERVIÇO*******
>/resetar twitter
>Por favor, informe sua senha master..
>isi*8965d)
>Tem certeza que deseja altera a senha para o serviço TWITTER ?
>sim
>Senha alterada com sucesso! Nova senha JfdbfioOD830*


*/