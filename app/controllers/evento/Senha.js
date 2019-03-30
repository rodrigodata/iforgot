/* Importação de dependencias */
const Mongoose = require("mongoose");

/* Importação Models */
const Senha = Mongoose.model("Senha");
const Servico = Mongoose.model("Servico");

/* Controller responsável pela geração de senha */
exports.criar = function(req, res, next) {
  const body = req.body;

  /* Verificar se o serviço informado existe */
  Servico.findOne({ nome: body.servico }, function(err, srv) {
    if ((!err || err == null) && (srv && srv._id)) {
      let senha = new Senha();

      /* Gera Salt e Hash */
      senha.geradorSenha();
      senha.gerarVencimentoSenha();
      senha.idChatTelegram = body.idChatTelegram;
      senha.mfa = body.mfa;
      senha.usuario = body.usuario;
      senha.descricao = body.descricao;
      senha.servico = srv._id;
      senha.tipoNotificacao = body.tipoNotificacao;
      /* TODO: Verificar se é necessário informar descrição de notificação sendo que é passado o id de notificação. */
      senha.descricaoNotificacao = body.descricaoNotificacao;

      senha
        .save()
        .then(() => {
          return res.status(201).send({
            ...senha.formataRespostaJSON()
          });
        })
        .catch(next);
    } else {
      return res.status(400).send({
        mensagem:
          "Ops, ocorreu um erro ao consulta o serviço informado. Por favor, tente novamente!"
      });
    }
  }).catch(next);
};

/* Controller responsável em buscar pelo id do documento o registro de senha */
exports.buscarPorId = function(req, res, next) {
  Senha.findById(req.params.id)
    .then(function(user) {
      return res.status(200).send(user ? user.formataRespostaJSON() : {});
    })
    .catch(next);
};
