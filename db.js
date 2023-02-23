// let con = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'password',
//     database: 'socio',
// });
// let mysql = require('mysql');

// let sql =
//     'INSERT INTO users (firstName, lastName, email, password, picturePath, location, occupation, viewedProfile, impressions, createdAt, updatedAt) VALUES ?';

// let values = data.map((user) => [
//     user.firstName,
//     user.lastName,
//     user.email,
//     user.password,
//     user.picturePath,
//     user.location,
//     user.occupation,
//     user.viewedProfile,
//     user.impressions,
//     user.createdAt,
//     user.updatedAt,
// ]);

// con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log('Number of records inserted: ' + result.affectedRows);
// });
