const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware для розбору JSON
app.use(express.json());

// Налаштування для обслуговування статичних файлів з поточної директорії
app.use(express.static(__dirname));

// Маршрут для отримання IP-адреси і її збереження
app.post("/save-ip", (req, res) => {
  const { ip } = req.body;

  // Логування отриманого IP
  console.log(`Отримано IP: ${ip}`);

  // Логування та збереження IP у файл
  fs.appendFileSync("ips.txt", `IP: ${ip}\n`, "utf8");

  // Відповідь клієнту
  res.json({ message: "IP збережено" });
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
