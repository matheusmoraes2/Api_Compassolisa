const supertest = require('supertest');
const { MongoClient } = require('mongodb');
const App = require('../../src/app');
const CarService = require('../../src/app/service/CarService');
const PeopleService = require('../../src/app/service/PeapleService');

const car = {};
let token = '';

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

    const tokenbarer = await PeopleService.login({
      email: 'tokenbarer@gmail.com',
      senha: '56545654'
    });
    token = `Bearer ${tokenbarer.token}`;
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Rota de post', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('authorization', token)
      .send({
        modelo: 'carro',
        cor: 'preto',
        ano: '2000',
        acessorios: [{ descricao: '4 portas' }, { descricao: 'Dir. Hidráulica' }, { descricao: 'radio' }],
        quantidadePassageiros: 4
      });

    expect(res.statusCode).toBe(201);
  });
  it('Rota de post falha do body', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('authorization', token)
      .send({
        modelo: 555,
        ano: '2000',
        acessorios: [{ descricao: '4 portas' }, { descricao: 'Dir. Hidráulica' }, { descricao: 'radio' }],
        quantidadePassageiros: 4
      });

    expect(res.statusCode).toBe(400);
  });

  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/car').set('authorization', token);

    expect(res.statusCode).toBe(200);
  });
  it('Rota de get, ano inválido', async () => {
    const res = await supertest(App).get('/api/v1/car?ano=1930').set('authorization', token);

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get, quantidadePassageiros inválido', async () => {
    const res = await supertest(App).get('/api/v1/car?quantidadePassageiros=teste').set('authorization', token);

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get', async () => {
    const res = await supertest(App).get('/api/v1/car');

    expect(res.statusCode).toBe(401);
  });
  // it('Rota de get not found', async () => {
  //   const res = await supertest(App).get('/api/v1/car?modelo=não existe').set('authorization', token);

  //   expect(res.statusCode).toBe(404);
  // });

  it('Rota de get por id', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.testCar._id}`).set('authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.cor).toBe('vermelho');
  });
  it('Rota de get por id Id invalido', async () => {
    const res = await supertest(App).get(`/api/v1/car/56458`).set('authorization', token);

    expect(res.statusCode).toBe(400);
  });
  it('Rota de get por id not found', async () => {
    const res = await supertest(App).get(`/api/v1/car/61f01442920325524413540a`).set('authorization', token);

    expect(res.statusCode).toBe(404);
  });
  it('Rota de patch', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/${car.testCar._id}/acessorios/${car.testCar.acessorios[0]._id}`)
      .set('authorization', token)
      .send({ descricao: 'teste patch' });

    expect(res.statusCode).toBe(204);
  });
  it('Rota de patch, falha no body', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/${car.testCar._id}/acessorios/${car.testCar.acessorios[0]._id}`)
      .set('authorization', token)
      .send({ descricao: 555 });

    expect(res.statusCode).toBe(400);
  });
  it('Rota de patch, id not found', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/${car.testCar._id}/acessorios/620e9d441ca3b8fe7759342b`)
      .set('authorization', token)
      .send({ descricao: ' patch teste' });

    expect(res.statusCode).toBe(404);
  });
  it('Rota de patch, inválid id', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/4654654654/acessorios/654687`)
      .set('authorization', token)
      .send({ descricao: ' patch teste' });

    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.testCar._id}`)
      .set('authorization', token)
      .send({
        modelo: 'Att carro',
        cor: 'branco',
        ano: '2010',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 6
      });
    expect(res.statusCode).toBe(204);
  });
  it('Rota de Update falha no body', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.testCar._id}`)
      .set('authorization', token)
      .send({
        modelo: 'Att carro',
        ano: '2010',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 6
      });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update ano inválido', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.testCar._id}`)
      .set('authorization', token)
      .send({
        modelo: 'Att carro',
        cor: 'branco',
        ano: '2025',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 6
      });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Update id not found', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/61f01442920325524413540a`)
      .set('authorization', token)
      .send({
        modelo: 'Att carro',
        cor: 'branco',
        ano: '2010',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 6
      });
    expect(res.statusCode).toBe(404);
  });
  it('Rota de Update id inválido', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/61f014429`)
      .set('authorization', token)
      .send({
        modelo: 'Att carro',
        cor: 'branco',
        ano: '2010',
        acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Dir. Hidráulica' }],
        quantidadePassageiros: 6
      });
    expect(res.statusCode).toBe(400);
  });
  it('Rota de Delete', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.testCar._id}`).set('authorization', token);

    expect(res.statusCode).toBe(204);
  });
  it('Rota de Delete id inválido', async () => {
    const res = await supertest(App).delete(`/api/v1/car/654654654`).set('authorization', token);

    expect(res.statusCode).toBe(400);
  });
  it('Rota de Delete id not found', async () => {
    const res = await supertest(App).delete(`/api/v1/car/61f01442920325524418540a`).set('authorization', token);

    expect(res.statusCode).toBe(404);
  });
});
