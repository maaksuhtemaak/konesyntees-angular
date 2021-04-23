const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password'
});

connection.connect();
connection.query('CREATE DATABASE IF NOT EXISTS prompts;');
connection.query('USE prompts;');
connection.query('CREATE TABLE IF NOT EXISTS prompts (id integer auto_increment primary key, service varchar(100), prompt varchar(300), created datetime, removed datetime);');

const port = process.env.PORT || 2700;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});