'use stricts';

require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);
const url = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/v1`;

describe('Auth >> POST /auth/login', () => {
  it('Deberiamos recibir un error 500', (done) => {
    let credentials = {
      email: 'emailss@email.com',
      password: '123456s',
    };
    chai
      .request(url)
      .post('/auth/login')
      .send(credentials)
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(500);
        done();
      });
  });
});
