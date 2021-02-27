import supertest from 'supertest';
import request from 'supertest';
import ServerConfig from '../../config/ServerConfig';

describe('Users', () => {
    beforeAll(async() => {
        const app = new ServerConfig();
        app.init();
        global.testRequest = supertest(app.getApplication())
    })

    it('Should work please', async () => {
        const response = await global.testRequest.get('/users')

        expect(response.text).toBe('true');
    })
})