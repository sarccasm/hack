const express = require("express");
const fs = require("fs");
const path = require("path"); // Додаємо для роботи з шляхами
const app = express();
const PORT = 3000; // Порт для Heroku або локальний 3000

// Middleware для розбору JSON
app.use(express.json());

// Налаштування для обслуговування статичних файлів з поточної директорії
app.use(express.static(__dirname));

// Маршрут для отримання IP-адреси і її збереження
app.post("/save-ip", (req, res) => {
  const { ip } = req.body;

  // Логування для перевірки
  console.log(`Отримане тіло запиту: ${JSON.stringify(req.body)}`);

  if (!ip) {
    console.error("IP не отримано");
    return res.status(400).json({ message: "IP не отримано" });
  }

  // Абсолютний шлях до файла ips.txt
  const filePath = path.join(__dirname, "ips.txt");

  // Логування та збереження IP у файл
  fs.appendFile(filePath, `IP: ${ip}\n`, "utf8", (err) => {
    if (err) {
      console.error("Помилка при записі IP:", err);
      return res.status(500).json({ message: "Помилка при збереженні IP" });
    }
    console.log(`IP ${ip} успішно збережено.`);
    // Відповідь клієнту
    res.json({ message: "IP збережено" });
  });
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
