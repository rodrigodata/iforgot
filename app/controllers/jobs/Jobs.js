/* Importação de Serviços */
const SenhasVencidasJob = require('../../services/Cron');

/* Importação lib */
const DateUtils = require('../../lib/DateUtils');

/* Controller responsável em buscar Cron ativas/inativas dentro da aplicação. */
exports.buscar = function (req, res, next) {

    /* Array com Jobs da aplicação. Nele conseguimos ter a informação do nome, status, ultima execução e quando será a próxima. */
    const Jobs = [
        {
            nome: 'SenhasVencidasJob',
            status: SenhasVencidasJob.SenhasVencidasJob.running ? 'Ativo' : 'Inativo',
            ultimaExecucao: SenhasVencidasJob.SenhasVencidasJob.lastDate() ? DateUtils.formatarDataHorarioBrasil(SenhasVencidasJob.SenhasVencidasJob.lastDate()) : "",
            proximaExecucao: DateUtils.formatarDataHorarioBrasil(SenhasVencidasJob.SenhasVencidasJob.nextDate())
        }
    ];

    return res.status(200).send(Jobs);

};
