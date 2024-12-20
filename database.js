const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`INSERT INTO users (username, password) VALUES 
        ('admin', 'admin123'), 
        ('guest', 'guest123')`);

    console.log("Database initialized.");
});

module.exports = db;
