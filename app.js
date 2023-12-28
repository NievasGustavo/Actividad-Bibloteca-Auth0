const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const app = express();

const autenticacion = auth({
   audience: 'http://localhost:3000/libros',
   issuerBaseURL: 'https://dev-t70hvdwqp6p4zxtj.us.auth0.com/',
   tokenSigningAlg: 'RS256'
 });

 app.use(autenticacion);

 app.use(express.json());

 const librosRouter = require('./routes/libros');

 const errorHandler = require('./middleware/errorHandler');

 app.use('/libros', autenticacion,librosRouter);

 app.use(errorHandler);

const port = 3000;

 app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
 });
