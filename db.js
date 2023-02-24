// Add users
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

// Add posts

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

// userId: userIds[1],
// firstName: 'Steve',
// lastName: 'Ralph',
// location: 'New York, CA',
// description: 'Some really long random description',
// picturePath: 'post1.jpeg',
// userPicturePath: 'p3.jpeg',
// likes: new Map([
//     [userIds[0], true],
//     [userIds[2], true],
//     [userIds[3], true],
//     [userIds[4], true],
// ]),
// comments: ['random comment', 'another random comment', 'yet another random comment'],
