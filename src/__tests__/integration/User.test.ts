import supertest from 'supertest';
import request from 'supertest';
import ServerConfig from '../../config/ServerConfig';
import createConnection from '../../database/index';

describe('Users', () => {
    beforeAll(async() => {
        const connection = await createConnection();
        await connection.runMigrations();        
        const app = new ServerConfig();
        app.init();
        global.testRequest = supertest(app.getApplication())

    })


    it('Should work please', async () => {
        const response = await global.testRequest.post('/users').send({
            name: 'test',
            email: 'test#pires;.com'
        })

        expect(response.status).toBe(201);
    })

})