const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const mongoose 	     = require('mongoose');
const bodyParser     = require('body-parser');
const db			 = require('./config/db')

const app            = express();

const constants 	 = require('./config/constants')

global.__root   	= __dirname + '/'; 
global.__rootPlus	= constants

//start server
const port = 8000;

//body parser
app.use(bodyParser.json());

require('./app/routes')(app)

//server up
app.listen(port, () => {
	console.log('We are live on ' + port, 'lets rock!');
});    


