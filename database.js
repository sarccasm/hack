const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ips.db");

// Створюємо таблицю, якщо її ще немає
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ips (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
