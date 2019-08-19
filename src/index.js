const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const { mongoose} = require('./database');

//Settings
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
/* Sirve para que al recibir datos del servidor ,si son Json, los podamos procesar
 es una funcionalidad de express*/
app.use(express.json()); 

//Routes
app.use('/api/tasks',require('./routes/task.routes'));

//Static Files
//console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')));


//Starting the server
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
});