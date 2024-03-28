const mysql = require('mysql2');

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '9752',
    database: 'node-schema'
});

module.exports = pool.promise();