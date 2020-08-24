const request = require('supertest');
const server = require('./server.js');

beforeAll(async () => {
  console.log('Start test');
});

afterAll(() => {
  server.close();
  console.log('server closed');
});

describe('tests initialing', () => {
  //descrição do caso de testes
  test('try to search without input params', async () => {
    const response = await request(server).get('/github/getRepository');
    expect(response.status).toEqual(400);
  });

});
