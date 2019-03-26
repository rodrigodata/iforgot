/* Middleware responsável em formatar comando e texto informado */
const comandoArgumentos = () => async (ctx, next) => {
  /* Validamos o tipo de argumento informado */
  if (
    ctx.updateType === "message" &&
    ctx.updateSubTypes.indexOf("text") != -1
  ) {
    /* Texto enviado pelo usuario. */
    let texto = ctx.update.message.text;
    /* Busca ultima mensagem enviada pelo usuario, caso exista. */
    let lastMessage = ctx.session.lastMessage;
    /* Busca dados sobre o chat. */
    let chat = await ctx.getChat();

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
        chat: chat,
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
      ctx.state.command = {
        chat: chat,
        message: texto
      };
    } else {
      return ctx.reply("Por favor, insira um comando inválido.");
    }
  }
  return next();
};

module.exports = comandoArgumentos;
