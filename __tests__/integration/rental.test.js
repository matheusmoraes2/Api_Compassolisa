const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const App = require('../../src/app');
const RentalService = require('../../src/app/service/RentalService');

const rental = {};

describe('testando features da rota de Rental', () => {
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
    rental.testRental = await RentalService.create({
      nome: 'Localiza Rent a Car',
      cnpj: '78.191.720/5587-44',
      atividades: 'Aluguel de Carros E Gestão de Frotas',
      endereco: [
        {
          cep: '96200-200',
          number: '1234',
          isFilial: false
        }
      ]
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Rota de post', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Teste Locadora de carros',
        cnpj: '16.243.112/0021-55',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '50640-430',
            number: '5258',
            isFilial: false
          }
        ]
      });

    expect(res.statusCode).toBe(201);
    await RentalService.delete(res.body._id);
  });
  it('Rota de post, falha no body', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Teste Locadora de carros',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '50640-430',
            number: '5258',
            isFilial: false
          }
        ]
      });

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/rental');

    expect(res.statusCode).toBe(200);
  });
  it('Rota de get, query not found', async () => {
    const res = await supertest(App).get('/api/v1/rental?nome=não existe');

    expect(res.statusCode).toBe(404);
  });
  it('Rota de get por id', async () => {
    const res = await supertest(App).get(`/api/v1/rental/${rental.testRental._id}`);

    expect(res.statusCode).toBe(200);
  });
  it('Rota de get por id, id inválido', async () => {
    const res = await supertest(App).get(`/api/v1/rental/654968`);

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get por id, id not found', async () => {
    const res = await supertest(App).get(`/api/v1/rental/620e9b79502b61376b806ef6`);

    expect(res.statusCode).toBe(404);
  });
  it('Rota de Update', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/${rental.testRental._id}`)
      .send({
        nome: 'Teste Locadora de carros',
        cnpj: '11.670.986/0001-55',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '50640-430',
            number: '5258',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(204);
  });
  it('Rota de Update, falha no body', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/${rental.testRental._id}`)
      .send({
        nome: 'Teste Locadora de carros',
        cnpj: 85848,
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '50640-430',
            number: '5258',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update, id inválido', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/554848`)
      .send({
        nome: 'Teste Locadora de carros',
        cnpj: '11.670.986/0001-55',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '50640-430',
            number: '5258',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update, id not found', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/620e9b79502b61376b806ef6`)
      .send({
        nome: 'Teste Locadora de carros',
        cnpj: '11.670.986/0001-55',
        atividades: 'Aluguel de Carros E Gestão de Frotas',
        endereco: [
          {
            cep: '50640-430',
            number: '5258',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(404);
  });
  it('Rota de Delete', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/${rental.testRental._id}`);

    expect(res.statusCode).toBe(204);
  });
  it('Rota de Delete, id inválido', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/54as665`);

    expect(res.statusCode).toBe(400);
  });
  it('Rota de Delete, id not found', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/620e9b79502b61376b806ef6`);

    expect(res.statusCode).toBe(404);
  });
});
