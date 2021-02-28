import createConnection from '../../database/index';
import ServerConfig from '../../config/ServerConfig';
import supertest from 'supertest';

describe('Surveys', () => {
    beforeAll(async() => {
        const connection = await createConnection();
        await connection.runMigrations();
        const app = new ServerConfig();
        app.init();
        global.testRequest = supertest(app.getApplication());
    })

    it('Should register some survey', async() => {
        const response = await global.testRequest.post('/survey').send({
            title: 'Pesquisa de satisfação',
            description: 'De 0 a 10 qual a sua recomendação da nossa empresa'
        });

        expect(response.text).toBe('Pesquisa de satisfação');
    })
})