const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const App = require('../../src/app');
const PeopleService = require('../../src/app/service/PeapleService');

const people = {};

describe('testando features da rota de People', () => {
  let connection;
  let db;
  const dburl = `mongodb://127.0.0.1:27017/compassolisa`;
  beforeEach(async () => {
    await db.collection('compassolisa').deleteMany({});
  });
  beforeAll(async () => {
    connection = await MongoClient.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db(global.compassolisa);
    people.testPeople = await PeopleService.create({
      nome: 'matheus',
      cpf: '132.782.111-74',
      data_nascimento: '14/06/2000',
      email: 'matheusm4oa5s543da54raes32546@hotmail.com',
      senha: '123456789',
      habilitado: 'não'
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Rota de post', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'andre moras',
      cpf: '423.151.712-74',
      data_nascimento: '01/08/1974',
      email: 'andreamoraesdasilva2@hotmail.com',
      senha: '789456123',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(201);
    await PeopleService.delete(res.body._id);
  });
  it('Rota de post, ALready exist', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'andre moras',
      cpf: '132.782.111-74',
      data_nascimento: '01/08/1974',
      email: 'andreamoraesdasilva@hotmail.com',
      senha: '789456123',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(400);
  });
  it('Rota de post, invalid body menor de idade', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'andre moras',
      cpf: '332.782.111-74',
      data_nascimento: '01/08/2010',
      email: 'andreamoraesdasilva33@hotmail.com',
      senha: '789456123',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(400);
  });
  it('Rota de post, menor de idade', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'andre moras',
      cpf: '183.151.712-74',
      data_nascimento: '01/08/2015',
      email: 'andreamoraesdasilva@hotmail.com',
      senha: '789456123',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(400);
  });
  it('Rota de post falha no body', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'andre moras',
      data_nascimento: '01/08/1974',
      email: 'andreamoraesdasilva@hotmail.com',
      senha: '789456123',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/people');

    expect(res.statusCode).toBe(200);
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/people?habilitado=yes');

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/people?cpf=123.231.2');

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/people?email=matheus@');

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/people?nome=não existe');

    expect(res.statusCode).toBe(404);
  });
  it('Rota de get por id', async () => {
    const res = await supertest(App).get(`/api/v1/people/${people.testPeople._id}`);

    expect(res.statusCode).toBe(200);
  });
  it('Rota de get por id , id not found', async () => {
    const res = await supertest(App).get(`/api/v1/people/61f509a5ec38b6fe36fe17b7`);

    expect(res.statusCode).toBe(404);
  });
  it('Rota de get por id , id inválido', async () => {
    const res = await supertest(App).get(`/api/v1/people/61f50`);

    expect(res.statusCode).toBe(400);
  });
  it('Rota de login', async () => {
    const res = await supertest(App).post('/api/v1/authenticate').send({
      email: 'andreamoraes@hotmail.com',
      senha: '789456123'
    });
    expect(res.statusCode).toBe(200);
  });
  it('Rota de login, email ou senha inválido', async () => {
    const res = await supertest(App).post('/api/v1/authenticate').send({
      email: 'andreamoraes@hotmail.com',
      senha: '1111111'
    });
    expect(res.statusCode).toBe(500);
  });
  it('Rota de login, email ou senha inválido', async () => {
    const res = await supertest(App).post('/api/v1/authenticate').send({
      email: 'andreamoraes@',
      senha: '1111111'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de login, falha no body senha', async () => {
    const res = await supertest(App).post('/api/v1/authenticate').send({
      email: 'andreamoraes@hotmail.com',
      senha: 55584587
    });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update', async () => {
    const res = await supertest(App).put(`/api/v1/people/${people.testPeople._id}`).send({
      nome: 'alecxandro',
      cpf: '557.222.212-54',
      data_nascimento: '03/09/1974',
      email: 'alecxand4545r55o58@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(204);
  });
  it('Rota de Update falha no body', async () => {
    const res = await supertest(App).put(`/api/v1/people/${people.testPeople._id}`).send({
      nome: 'alecxandro',
      data_nascimento: '03/09/1974',
      email: 'alecxand4545r55o585@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update, id inválido', async () => {
    const res = await supertest(App).put(`/api/v1/people/654654`).send({
      nome: 'alecxandro',
      cpf: '557.222.222-54',
      data_nascimento: '03/09/1974',
      email: 'alecxand4545r55o585@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update, id not found', async () => {
    const res = await supertest(App).put(`/api/v1/people/61f509a5ec38b6fe36fe17b7`).send({
      nome: 'alecxandro',
      cpf: '557.114.222-54',
      data_nascimento: '03/09/1974',
      email: 'alecxandmendesdasilva@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(404);
  });
  it('Rota de Delete', async () => {
    const res = await supertest(App).delete(`/api/v1/people/${people.testPeople._id}`);

    expect(res.statusCode).toBe(204);
  });
  it('Rota de Delete, id not found', async () => {
    const res = await supertest(App).delete(`/api/v1/people/620ea156f529b28a1a0f6780`);

    expect(res.statusCode).toBe(404);
  });
  it('Rota de Delete, id inválido', async () => {
    const res = await supertest(App).delete(`/api/v1/people/6a0f6780`);

    expect(res.statusCode).toBe(400);
  });
});
