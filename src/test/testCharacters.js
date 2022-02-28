'use stricts';

require('dotenv').config();
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/v1`;
let token = '';

describe('Characters >> POST /auth/login', () => {
  it('Deberiamos recibir estado 200 y recibir token jwt', (done) => {
    let credentials = {
      email: 'email@email.com',
      password: '123456',
    };
    chai
      .request(url)
      .post('/auth/login')
      .send(credentials)
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });
});

describe('Characters >> GET /characters/ ', () => {
  it('Deberia obtener un array de personajes, cada item deberia tener atributos image y name.', (done) => {
    chai
      .request(url)
      .get('/characters')
      .auth(token, { type: 'bearer' })
      .end(function (err, res) {
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('characters');

        const characters = res.body.characters;
        expect(characters).to.be.an('array');

        // recorremos array
        characters.forEach((movie) => {
          expect(movie).to.have.property('name').to.be.a('string');
          expect(movie).to.have.property('image').to.be.a('string');
        });
        done();
      });
  });
});
