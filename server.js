const express = require("express");
const db = require("./database.js");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для розбору JSON
app.use(express.json());

// Налаштування для обслуговування статичних файлів з поточної директорії
app.use(express.static(__dirname));

// Маршрут для отримання IP-адреси і її збереження
app.post("/save-ip", (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    console.error("IP не отримано");
    return res.status(400).json({ message: "IP не отримано" });
  }

  // Збереження IP у базу даних
  db.run("INSERT INTO ips (ip) VALUES (?)", [ip], function (err) {
    if (err) {
      console.error("Помилка при збереженні IP:", err);
      return res.status(500).json({ message: "Помилка при збереженні IP" });
    }
    console.log(`IP ${ip} успішно збережено в базу даних.`);
    res.json({ message: "IP збережено" });
  });
});

// Додаємо маршрут для отримання всіх IP з бази даних
app.get("/ips", (req, res) => {
  db.all("SELECT * FROM ips", [], (err, rows) => {
    if (err) {
      console.error("Помилка при отриманні IP з бази даних:", err);
      return res.status(500).json({ message: "Помилка при отриманні IP" });
    }
    res.json(rows); // Відправляємо всі IP у відповідь
  });
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
