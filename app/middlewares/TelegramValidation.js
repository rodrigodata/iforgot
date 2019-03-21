/* Middleware responsável em formatar comando e texto informado */
const comandoArgumentos = () => async (ctx, next) => {
  /* Validamos o tipo de argumento informado */
  if (
    ctx.updateType === "message" &&
    ctx.updateSubTypes.indexOf("text") != -1
  ) {
    //let getChat = await ctx.getChat();
    console.log(ctx.session);

    const texto = ctx.update.message.text.toLowerCase();
    if (texto.startsWith("/")) {
      const match = texto.match(/^\/([^\s]+)\s?(.+)?/);
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
        raw: texto,
        commandClient,
        args
      };

      ctx.session.lastMessage = args[0];
    }
  }
  return next();
};

module.exports = comandoArgumentos;
