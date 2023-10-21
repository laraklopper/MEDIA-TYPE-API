const request = require('supertest');
const app = require('/app')

describe('GET /app', () => {
    test('snapshot', async () => { 
        const response =await request(app).get('/app');
        expect(response.text).toMatchSnapshot();
     }) })