const express = require('express');
const app = express();
let port = 2611;
let mysql = require('mysql');
const data = require('./data');

let con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'socio',
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
