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
      cnpj: '16.875.085/0007-55',
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
        cnpj: '16.547.888/0007-55',
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
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/rental');

    expect(res.statusCode).toBe(200);
  });
  it('Rota de get por id', async () => {
    const res = await supertest(App).get(`/api/v1/rental/${rental.testRental._id}`);

    expect(res.statusCode).toBe(200);
  });
  it('Rota de Update', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/${rental.testRental._id}`)
      .send({
        nome: 'Teste Locadora de carros',
        cnpj: '16.670.986/0001-55',
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
  it('Rota de Delete', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/${rental.testRental._id}`);

    expect(res.statusCode).toBe(204);
  });
});
