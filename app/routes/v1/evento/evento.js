const mongoose = require('mongoose');
const router = require('express').Router();
const Senha = mongoose.model('Senha');

router.post('/senha', (req, res, next) => {
    if (!body.usuario)
        return res
            .status(422)
            .json({errors: {usuario: 'Valor não pode ser em branco ou nulo.'}});

    if (!body.descricao)
        return res
            .status(422)
            .json({errors: {usuario: 'Valor não pode ser em branco ou nulo.'}});

    let body = req.body;
    let senha = new Senha();
    senha.senha = senha.geradorSenha();
    senha.usuario = body.usuario;
    senha.descricao = body.descricao;
    senha.tipoNotificacao = body.tipoNotificacao;
    /* TODO: Verificar se é necessário informar descrição de notificação sendo que é passado o id de notificação. */
    senha.descricaoNotificacao = body.descricaoNotificacao;

    senha
        .save()
        .then(() => {
            return res.status(201).send({
                ...senha.formataRespostaJSON(senha)
            });
        })
        .catch(next);
});

module.exports = router;
