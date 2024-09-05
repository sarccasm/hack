const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ips.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

function getAllIPs(callback) {
  db.all("SELECT * FROM ips", (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
}

module.exports = {
  db,
  getAllIPs,
};
