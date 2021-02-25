import 'reflect-metadata';
import './database'
import express from 'express';
import router from './router';
import bodyParser from 'body-parser';

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(router);
app.listen(3031, () => console.log('Server is running on port: ' + 3031));