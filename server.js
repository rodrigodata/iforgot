/* */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

/* Configuração Express */
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Importacao conexao banco de dados */
require('./database');

/* Importação dos models */
require('./app/models/Senha');
var Senha = mongoose.model('Senha');

app.get('/', (req, res) => {
    res.send({message: 'Ok'});
});

// app.get("/evento/senha");

app.post('/evento/senha', (req, res, next) => {
    var body = req.body;
    var senha = new Senha();
    // Validar integridade dos dados
    // Salvar body no banco de dados

    senha.usuario = body.usuario;
    senha.descricao = body.descricao;
    senha.tipoNotificacao = body.tipoNotificacao;
    senha.descricaoNotificacao = body.descricaoNotificacao;

    senha
        .save()
        .then(() => {
            return res.status(201).send({
                senha: senha.formataRespostaJSON(senha)
            });
        })
        .catch(next);
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Escutando na porta ' + server.address().port);
});
