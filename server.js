const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

/* Configuração Express */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send({ message: "Ok" });
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port " + server.address().port);
});
