const express = require("express");
const db = require("./database");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для розбору JSON
app.use(express.json());

// Налаштування для обслуговування статичних файлів
app.use(express.static(__dirname));

// Маршрут для збереження IP-адреси у базу даних
app.post("/save-ip", (req, res) => {
  const { ip } = req.body;

  console.log(`Отримане тіло запиту: ${JSON.stringify(req.body)}`);

  // Додаємо IP до бази даних
  const query = `INSERT INTO ips (ip) VALUES (?)`;
  db.run(query, [ip], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Не вдалося зберегти IP" });
    }

    // Успішне збереження
    res.json({ message: "IP збережено", id: this.lastID });
  });
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
