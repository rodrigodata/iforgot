/* */
const mongoose = require('mongoose');
const Senha = mongoose.model('Senha');

/* Controller responsável pela geração de senha */
exports.criar = function(req, res, next) {
    let body = req.body;

    if (!body.usuario)
        return res.status(400).json({
            errors: {usuario: 'Valor não pode ser em branco ou nulo.'}
        });

    if (!body.descricao)
        return res.status(400).json({
            errors: {usuario: 'Valor não pode ser em branco ou nulo.'}
        });

    let senha = new Senha();
    /* Gera Salt e Hash */
    senha.geradorSenha();
    senha.mfa = body.mfa;
    senha.usuario = body.usuario;
    senha.descricao = body.descricao;
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
};

/* Controller responsável em buscar pelo id do documento o registro de senha */
exports.buscarPorId = function(req, res, next) {
    if (!req.params.id)
        return res.status(400).json({
            errors: {id: 'Valor não pode ser em branco ou nulo.'}
        });

    Senha.findById(req.params.id)
        .then(function(user) {
            return res.status(200).send(user ? user.formataRespostaJSON() : {});
        })
        .catch(next);
};
