/* Importação de Dependencias */
const CronJob = require("cron").CronJob;

/* Job que verifica se há alguma senha vencida. */
const SenhasVencidasJob = new CronJob(
  "* * * * *",
  function() {
    /* Importação Serviço Senhas Vencidas */
    const SenhasVencidas = require("./SenhasVencidas");
    console.log("Job: Senhas Vencidas Inicializado Com Sucesso!");
    //SenhasVencidas.verificarCron();
    SenhasVencidas.verificarSenhaVencida();
  },
  null,
  true,
  "America/Sao_Paulo"
);

module.exports = {
  SenhasVencidasJob
};
