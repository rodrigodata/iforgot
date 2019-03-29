/* Importação  */
const moment = require("moment");
require("moment/min/locales");

/* Seta a timezone da nossa aplicação para pt-BR */
moment.locale("pt-BR");

const DateUtils = {
  adicionarVencimentoDataHorario(number, type) {
    return moment()
      .add(number, type)
      .format();
  }
};

module.exports = DateUtils;
