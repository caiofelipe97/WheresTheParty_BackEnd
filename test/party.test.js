const app = require('../app'); 
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('Test GET Party', () => {
    it('deve retornar as festas cadastradas', () => {
        request(app)
        .get('/party')
        .end((err, res) => {
            expect('Content-Type', /json/);
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.eql([]);
        });
    });
});