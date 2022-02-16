const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const App = require('../../src/app');
const CarService = require('../../src/app/service/CarService');

const car = {};

describe('testando features da rota de Car', () => {
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
    car.testCar = await CarService.create({
      modelo: 'Uno',
      cor: 'vermelho',
      ano: '2010',
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: '4 portas' }],
      quantidadePassageiros: 5
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Rota de post', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .send({
        modelo: 'carro',
        cor: 'preto',
        ano: '2000',
        acessorios: [{ descricao: '4 portas' }, { descricao: 'Dir. Hidráulica' }, { descricao: 'radio' }],
        quantidadePassageiros: 4
      });

    expect(res.statusCode).toBe(201);
  });

  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/car');

    expect(res.statusCode).toBe(200);
  });

  it('Rota de get por id', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.testCar._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.cor).toBe('vermelho');
  });

  it('Rota de Update', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.testCar._id}`)
      .send({
        modelo: 'Att carro',
        cor: 'branco',
        ano: '2010',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 6
      });
    expect(res.statusCode).toBe(204);
  });

  it('Rota de Delete', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.testCar._id}`);

    expect(res.statusCode).toBe(204);
  });
});
