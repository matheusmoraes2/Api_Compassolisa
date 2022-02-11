const supertest = require('supertest');
const {MongoClient} = require('mongodb')
const App = require('../../src/app');
const PeopleService = require('../../src/app/service/PeapleService');
const people = {};

describe('testando features da rota de People', () => {
    let connection
    let db
    const dburl = `mongodb://127.0.0.1:27017/compassolisa`
    beforeEach(async () =>{
        await db.collection('compassolisa').deleteMany({});
    });
    beforeAll(async () => {
        connection = await MongoClient.connect(dburl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        db = await connection.db(global.compassolisa);
        people.testPeople = await PeopleService.create({
            nome: 'matheus',
            cpf: '187.873.004-74',
            data_nascimento:'14/06/2000',
            email:'matheusmoraes85@hotmail.com',
            senha: '123456789',
            habilitado: 'não'
        });
      });
    
      afterAll(async () => {
        await connection.close();
    });

    it('Rota de post', async ()=> {
        const res = await supertest(App)
          .post('/api/v1/people')
          .send({
            nome: 'andre moras',
            cpf: '123.654.989-74',
            data_nascimento:'01/08/1974',
            email:'andreamoraessilva@hotmail.com',
            senha: '789456123',
            habilitado: 'sim'
        });
    
        expect(res.statusCode).toBe(201);
    });
    it('Rota de get', async ()=> {
        const res = await supertest(App)
          .get('/api/v1/people');
    
        expect(res.statusCode).toBe(200);
    });
    it('Rota de get por id', async ()=> {
        const res = await supertest(App)
          .get(`/api/v1/people/${people.testPeople._id}`);
    
        expect(res.statusCode).toBe(200);
      
    });
    it('Rota de login', async () =>{
        const res = await supertest(App)
          .post('/api/v1/authenticate')
          .send({
            email:'andreamoraes@hotmail.com',
            senha: '789456123'
        });
        expect(res.statusCode).toBe(200);
    });
    it('Rota de Update', async ()=>{
        const res = await supertest(App)
          .put(`/api/v1/people/${people.testPeople._id}`)
          .send({
            nome: 'alecxandro',
            cpf: '258.986.899-78',
            data_nascimento:'03/09/1974',
            email:'alecxandro85@hotmail.com',
            senha: '123456789',
            habilitado: 'sim'
        });
        expect(res.statusCode).toBe(204);
    });
    it('Rota de Delete', async () => {
        const res = await supertest(App)
          .delete(`/api/v1/people/${people.testPeople._id}`);
    
        expect(res.statusCode).toBe(204);
    });

});   