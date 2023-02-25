// const express = require('express');
// const app = express();
// let port = 2611;
// let mysql = require('mysql');

// let con = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'password',
//     database: 'socio',
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log('Connected!');
// });

// const posts = require('./data');

// let sql =
//     'INSERT INTO posts (userId, firstName, lastName, location, description, picturePath, userPicturePath, likes ) VALUES ?';

// let values = posts.map((post) => [
//     post.userId,
//     post.firstName,
//     post.lastName,
//     post.location,
//     post.description,
//     post.picturePath,
//     post.userPicturePath,
//     post.likes,
// ]);

// con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log('Number of records inserted: ' + result.affectedRows);
// });

// app.get('/', (req, res) => {
//     res.send('hi');
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
