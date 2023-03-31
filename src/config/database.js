const mysql = require('mysql');

const pool = mysql.createPool({
    "user": `${process.env.DB_USER}`,
    "password": `${process.env.DB_PASSWORD}`,
    "database": `${process.env.DB_DATABASE}`,
    "host": `${process.env.DB_HOST}`,
    "port": `${process.env.DB_PORT}`,
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

module.exports = pool ;




