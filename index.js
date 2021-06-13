const express = require('express');
const path = require('path');
const app = express();

const convert = require('./lib/convert');
const apiBCB = require('./lib/api-bcb');

const port = process.env.port || 3003;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const cotacao = await apiBCB.getCotacao();
    res.render('home', {
        cotacao
    })
});

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query;
    const conversao = convert.convert(cotacao, quantidade);

    if (cotacao && quantidade) {
        res.render('cotacao', {
            error: null,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        });
    } else {
        res.render('cotacao', {
            error: 'Valores inválidos'
        })
    }

});

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('ConvertMyMoney está online');
    }
});