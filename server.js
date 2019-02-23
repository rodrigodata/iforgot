const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ message: 'Ok'});
});

app.listen(8081, () => {
    console.log('Escutando na porta 8081');
});