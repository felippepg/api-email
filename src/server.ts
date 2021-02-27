import 'reflect-metadata';
import createConnection from './database'
import SetupServer from './config/ServerConfig';

const app = new SetupServer(6564);
createConnection()
app.init();
app.start();