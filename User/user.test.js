const app = require('../app'); 
const request = require('supertest');

request(app)
  .get('/user/me')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });