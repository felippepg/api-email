import 'reflect-metadata';
import './database'
import SetupServer from './config/ServerConfig';

const app = new SetupServer();
app.init();
