/* Importação  */
const moment = require("moment");
require("moment/min/locales");

/* Seta a timezone da nossa aplicação para pt-BR */
moment.locale("pt-BR");

const DateUtils = {
  formatarDataHorarioBrasil(date) {
    return moment(date).format();
  },
  buscarDataHorarioBrasil() {
    return moment().format();
  },
  adicionarVencimentoDataHorario(number, type) {
    return moment()
      .add(number, type)
      .format();
  }
};

module.exports = DateUtils;
