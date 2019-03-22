/* Middleware responsável em formatar comando e texto informado */
const comandoArgumentos = () => async (ctx, next) => {
  /* Validamos o tipo de argumento informado */
  if (
    ctx.updateType === "message" &&
    ctx.updateSubTypes.indexOf("text") != -1
  ) {
    let texto = ctx.update.message.text;
    let lastMessage = ctx.session.lastMessage;

    if (texto.startsWith("/")) {
      const match = texto.match(/^\/([^\s]+)\s?(.+)?/);
      texto = texto.toLowerCase();
      let args = [];
      let commandClient;
      if (match !== null) {
        if (match[1]) {
          commandClient = match[1];
        }
        if (match[2]) {
          args = match[2].split(" ");
        }
      }

      ctx.state.command = {
        lastMessage: ctx.session.lastMessage ? ctx.session.lastMessage : {},
        raw: texto,
        commandClient,
        args
      };

      ctx.session.lastMessage = {
        message: args[0],
        raw: texto,
        command: commandClient
      };
    } else if (
      lastMessage &&
      lastMessage.message &&
      lastMessage.raw.startsWith("/")
    ) {
      console.log("Ultima mensagem foi um comando valido");
      ctx.state.command = {
        message: texto
      };
    } else {
      return ctx.reply("Por favor, insira um comando inválido.");
    }
  }
  return next();
};

module.exports = comandoArgumentos;
