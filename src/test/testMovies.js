'use stricts';

require('dotenv').config();
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/v1`;
let token = '';

describe('Movie >> POST /auth/login', () => {
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

describe('Movie >> GET /movies/ ', () => {
  it('Deberia obtener todas las peliculas, cada item deberia tener los atributos imagen, título y fecha de creación.', (done) => {
    chai
      .request(url)
      .get('/movies')
      // .set({ Authorization: `Bearer ${token}` })
      .auth(token, { type: 'bearer' }) // with chai bearer
      .end(function (err, res) {
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('movies');

        const movies = res.body.movies;
        expect(movies).to.be.an('array');

        // recorremos array
        movies.forEach((movie) => {
          expect(movie).to.have.property('name').to.be.a('string'); // titulo
          expect(movie).to.have.property('image').to.be.a('string');
          expect(movie).to.have.property('dateCreated').to.be.a('string');
        });
        done();
      });
  });

  it('Deberia recibir un estado 200, al buscar con query name, genre, order', (done) => {
    chai
      .request(url)
      .get('/movies')
      .query({ name: 'Matrix', genre: 1, order: 'asc' })
      .auth(token, { type: 'bearer' })
      .end(function (err, res) {
        // console.log(res.body);
        // expect(res).to.have.param('name', 'genre', 'order');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('movies');
        done();
      });
  });
});

// bloqueo por no estar autenticado
describe('Movie >> POST /movies/', () => {
  it('Deberia recibir un error 403 porque es necesario un token valido', (done) => {
    let data = {
      name: 'Codigo Dragon',
      image: 'https://imagendeejemplo.com/image.jpg',
      score: 5,
      dateCreated: '2020-12-14',
      GenderId: 2,
    };
    chai
      .request(url)
      .post('/movies')
      .send(data)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('Movie >> GET /movies/{id}', () => {
  it('Deberia contener los campos name, score, date, image y genero id', (done) => {
    chai
      .request(url)
      .get('/movies/1')
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.nested.property('movie.id').to.be.equal(1);
        // expect(res.body).to.have.nested.property('movie.id', 1);
        expect(res.body.movie).to.have.property('name').to.be.a('string');
        expect(res.body.movie).to.have.property('dateCreated').to.be.a('string');
        expect(res.body.movie).to.have.property('image').to.be.a('string');
        expect(res.body.movie).to.have.property('score').that.is.a('number');
        expect(res.body.movie).to.have.property('GenderId').that.is.a('number');
        done();
      });
  });

  it('Si ingresamos un id no numerico, deberia mostrar un error con un mensaje "Invalido"', (done) => {
    chai
      .request(url)
      .get('/movies/asdasd')
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(500);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').to.includes('Invalido');
        done();
      });
  });

  it('Si ingresamos un id que no existe, deberia mostrar un error con un mensaje "Item no encontrado"', (done) => {
    chai
      .request(url)
      .get('/movies/200')
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(500);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').to.includes('Item no encontrado');
        done();
      });
  });

  // comprobando relacion BD
  it('Deberia existir un array vacio o con la lista de personajes "Characters"', (done) => {
    chai
      .request(url)
      .get('/movies/1')
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.nested.property('movie.Characters').to.be.a('array');
        done();
      });
  });
});
