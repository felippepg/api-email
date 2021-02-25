import { createConnection } from 'typeorm';

createConnection()
    .then(connection => console.log('conectado '))
    .catch(err => console.log('Deu erro: ' + err))