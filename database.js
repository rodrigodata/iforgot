/* */
const mongoose = require('mongoose');

/* Seta variavel de ambiente com string do banco de dados */
const uri = process.env.DB_HOST;

/* Caso possua URL configurada */
if (uri) {
    mongoose
        .connect(uri, {useNewUrlParser: true})
        .then((conection) => {
            console.log('conectado ao banco de dados...');
        })
        .catch((err) => {
            console.log(err.errors[0].err);
        });
}
