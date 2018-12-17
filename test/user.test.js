const app = require('../app'); 
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test GET User', () => {
    it('deve retornar o usuario logado', () => {
        request(app)
        .get('/user/myProfile')
        .end((err, res) => {
            expect('Content-Type', /json/);
            expect(res.statusCode).to.be.equal(200);
        });
    });
});

describe('Test POST User', () => {
    it('deve retornar o user criado que é um usuário válido', () => {
        const user = {
            "name":"Caio Felipe de A. Melo",
            "email":"new@email.com",
            "password": "12345678",
            "house":{
                "name": "Bar do cuscuz",
                "description": "Caro pra carai",
                "address": "AV manuel tavares",
                "imageUrl": "https://d1jgln4w9al398.cloudfront.net/imagens/ce/logosgde/bar%20do%20cuscuz_bardo_rant01.png"
            }
        };
        request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body.message).to.be.equal("Registro realizado com sucesso");
        });
    });
});