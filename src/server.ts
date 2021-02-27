import 'reflect-metadata';
import './database'
import SetupServer from './config/ServerConfig';

const app = new SetupServer(6564);
app.init();
app.start();