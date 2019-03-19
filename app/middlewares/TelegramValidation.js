/* Middleware responsável em formatar comando e texto informado */
const comandoArgumentos = () => (ctx, next) => {
  /* Validamos o tipo de argumento informado */
  if (
    ctx.updateType === "message" &&
    ctx.updateSubTypes.indexOf("text") != -1
  ) {
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
    }
  }
  return next();
};

module.exports = comandoArgumentos;
