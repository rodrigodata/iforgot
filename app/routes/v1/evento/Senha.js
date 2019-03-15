/* Importação de dependencias */
const mongoose = require('mongoose');
const router = require('express').Router();

/* Importação de middlewares */
const SchemaValidator = require('../../../middlewares/SchemaValidation');

/* Importação de Models */
const Senha = mongoose.model('Senha');

router.post('/senha', SchemaValidator(true), (req, res, next) => {
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
});

router.get('/senha/:id', (req, res, next) => {
    if (!req.params.id)
        return res.status(400).json({
            errors: {id: 'Valor não pode ser em branco ou nulo.'}
        });

    const id = req.params.id;
    Senha.findById(id)
        .then(function(user) {
            return res.status(200).send({
                ...user.formataRespostaJSON()
            });
        })
        .catch(next);
});

module.exports = router;
