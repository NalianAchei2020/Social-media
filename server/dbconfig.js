import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"Nalian@2020",
    database: "social_media",
})

export default db;