const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const path = require('path');
const public = path.join(__dirname, 'static');
const index = require('./routes/index.route');
const app = express();
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');

const swagger = require('swagger-express');

//Permitir requisições
app.use(cors());

app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    basePath: 'http://localhost:3000',
    apis: ['./User/user.controller.js']
}));

// faz um log das requisições'
app.use(morgan('combined'));

// faz o parse de requisições com o corpo do tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// faz o parse de requisições com o corpo do tipo application/json
app.use(bodyParser.json());

// Permite utilizar arquivos estáticos
app.use(express.static(public));


app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();  // sem o next, a chamada para aqui
});

//Middleware para as rotas
app.use('/', index);

mongoose.connect('mongodb://localhost/wheresTheParty');

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

module.exports = app;