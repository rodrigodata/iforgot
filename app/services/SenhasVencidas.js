/* Importação Dependencias */
const Mongoose = require("mongoose");

/* Importação Models*/
const Senha = Mongoose.model("Senha");
const Servico = Mongoose.model("Servico");

/* Importação Utils */
const DateUtils = require("../lib/DateUtils");

/* Importação Constants */
const Constants = require("../constants/app");

/* Importação Jobs */
const Jobs = require("./Cron");

/* Importação Services */
const Telegram = require("./Telegram");

const Cron = {
  async verificarSenhaVencida() {
    /* Lista todas as senhas que o vencimento é menor que a data e horário no momento em que a Cron é executada. */
    let listagemSenhas = await this.listagemSenhas();

    /* Iterar sobre o array e para cada um, enviar uma notificação para o telegram. */
    listagemSenhas.forEach(function(value) {
      Servico.findById(value.servico, function(err, servico) {
        if (err) {
          console.log(err);
          return err;
        }
        if (servico && servico.nome) {
          let mensagem = `Olá, o serviço ${
            servico.nome
          } venceu em ${DateUtils.formatarDataHorarioBrasil(
            value.vencimento
          )}. Por favor, atualize sua senha.`;
          return Telegram.enviarMensagem(Constants.TELEGRAM_CHAT_ID, mensagem);
        }
      }).catch(function(err) {
        console.log(err);
        return err;
      });
    });
  },
  listagemSenhas() {
    return Senha.find({
      vencimento: { $lte: DateUtils.buscarDataHorarioBrasil() }
    }).then(function(listagemSenhas) {
      return listagemSenhas;
    });
  },
  iniciarCron() {
    /* Iniciar Cron Senhas Vencidas */
    Jobs.SenhasVencidasJob.start();
  },
  verificarCron(cron) {
    /* Retorna se a Cron informada está rodando ou não. */
    return cron.running;
  }
};

module.exports = Cron;
