/* */
const Mongoose = require('mongoose');
const Servicos = Mongoose.model('Servicos');

/* Controller responsável pela criação de novos serviços em que possa ser gerado um */
exports.criar = function(req, res, next) {
    let body = req.body;

    if (!body.nome)
        return res.status(400).json({
            errors: {nome: 'Valor não pode ser em branco ou nulo.'}
        });

    let servico = new Servicos();
    servico.nome = body.nome;

    servico
        .save()
        .then(() => {
            return res.status(201).send({
                ...req.body
            });
        })
        .catch(next);
};
