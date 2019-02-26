/* */
const mongoose = require("mongoose");

/* Seta variavel de ambiente com string do banco de dados */
const uri = process.env.DB_HOST;

/* Caso possua URL configurada */
if (uri) {
    mongoose.connect(process.env.MONGODB_URI);
}

var server = app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port " + server.address().port);
});
