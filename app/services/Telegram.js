/* Importação de dependencias */
const Telegraf = require("telegraf");
const Session = require("telegraf/session");
const Mongoose = require("mongoose");

/* Precisamos importar o contexto dos models para conseguir efetuar consultas ao banco de dados */
require("../models/index");

/* Importação de Constants da aplicação */
const Contants = require("../constants/app");

/* Importação de Middleware */
const TelegramMiddlewareValidation = require("../middlewares/TelegramValidation");

/* Importação de Models */
const Servico = Mongoose.model("Servico");
const Senha = Mongoose.model("Senha");
const Usuario = Mongoose.model("Usuario");

const Comandos = {
  bot: {},
  registarMiddlewares() {
    /* Sessão de Usuário para cachear ultima mensagem. */
    this.bot.use(Session());

    /* Middleware responsável pela formatação do contexto. */
    this.bot.use(TelegramMiddlewareValidation());
  },
  registrarComandos() {
    /* Inicia a conversa com o usuário. */
    this.bot.start(context => {
      context.reply("Hello Dave");
    });

    /* Registra comando /servico. */
    this.consultarServico();
  },
  consultarServico() {
    return this.bot.command("servico", context => {
      const { raw, args } = context.state.command;

      if (!args[0] || args[0] == "")
        return context.reply(
          `Nenhum comando informado. Por favor, tente novamente.\nComando informado '${raw}'`
        );

      return context.reply("Por favor, informe sua senha master..");
    });
  },
  validarSenhaMaster() {
    return this.bot.on("text", function(context) {
      const { message, chat } = context.state.command;
      const lastMessage = context.session.lastMessage;
      const servico = lastMessage.message;

      Servico.findOne({ nome: servico }, function(err, registroServico) {
        if (err)
          return context.reply(
            `Ops.. ocorreu um erro ao buscar o serviço '${
              args[0] && args[0] != "" ? args[0].toUpperCase() : ""
            }'`
          );
        if (!registroServico || !registroServico.nome)
          return context.reply(
            `Nenhum serviço encontrado. Serviço informado '${args[0]}'`
          );

        Usuario.findOne({ usuario: chat.username }).then(async function(
          usuarioMaster
        ) {
          if (usuarioMaster == null || usuarioMaster == undefined)
            return context.reply(
              "O seu usuário do telegram não possui vinculo. Favor verificar!"
            );

          /* */
          Senha.findOne({ servico: registroServico._id }, function(
            errRegistro,
            registroSenha
          ) {
            if (!errRegistro && registroSenha) {
              /* Precisa implementar comparacao por salt. */
              let isMasterPassword = usuarioMaster.verificarSenha(message);

              if (isMasterPassword) {
                /* */
                delete context.session.lastMessage;
                /* */
                let senhaServico = registroSenha.descriptografarSenha();
                return context.replyWithHTML(`
                <b>Serviço:</b> ${
                  registroServico.nome
                }\n<b>Senha expira:</b> 05/05/2019 às 16:18\n<b>Senha:</b> ${senhaServico}
              `);
              } else {
                return context.reply(
                  "Senha incorreta. Por favor, tente novamente!"
                );
              }
            } else {
              delete context.session.lastMessage;
              return context.reply(
                `Não há senha cadastrada para o serviço '${
                  registroServico.nome
                }'`
              );
            }
          });
        });
      });
    });
  },
  buscarInformacoesServico() {
    /* Descontrução de objeto. */
    const { raw, args } = context.state.command;

    /* Validação se algum comando foi informado. */
    if (!args[0] || args[0] == "")
      return context.reply(
        `Nenhum comando informado. Por favor, tente novamente.\nComando informado '${raw}'`
      );

    /* Efetuar busca por serviço. */
    Servico.findOne({ nome: args[0] }, function(err, registroServico) {
      if (err)
        return context.reply(
          `Ops.. ocorreu um erro ao buscar o serviço '${
            args[0] && args[0] != "" ? args[0].toUpperCase() : ""
          }'`
        );
      if (!registroServico || !registroServico.nome)
        return context.reply(
          `Nenhum serviço encontrado. Serviço informado '${args[0]}'`
        );

      Senha.findOne({ servico: registroServico._id }, function(
        err,
        registroSenha
      ) {
        if (!err && registroSenha) {
          let senha = registroSenha.descriptografarSenha();
          return context.replyWithHTML(`
             <b>Serviço:</b> ${
               registroServico.nome
             }\n<b>Senha expira:</b> 05/05/2019 às 16:18\n<b>Senha:</b> ${senha}
           `);
        } else {
          return context.reply(
            `Não há senha cadastrada para o serviço '${registroServico.nome}'`
          );
        }
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
    /* Registrar hook para escutar texto puro. */
    this.validarSenhaMaster();
    /* Inicia nosso bot. */
    this.bot.launch();
    /* Info */
    console.log("Bot iniciado com sucesso");
  }
};

module.exports = Comandos;
