const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname));

app.post("/save-ip", (req, res) => {
  const { ip } = req.body;

  console.log(`Отримане тіло запиту: ${JSON.stringify(req.body)}`);

  if (!ip) {
    console.error("IP не отримано");
    return res.status(400).json({ message: "IP не отримано" });
  }

  const filePath = path.join(__dirname, "ips.txt");

  fs.access(filePath, fs.constants.W_OK | fs.constants.R_OK, (err) => {
    if (err) {
      console.error("Немає доступу до файла:", err);
      return res.status(500).json({ message: "Немає доступу до файла" });
    }

    fs.appendFile(filePath, `IP: ${ip}\n`, "utf8", (err) => {
      if (err) {
        console.error("Помилка при записі IP:", err);
        return res.status(500).json({ message: "Помилка при збереженні IP" });
      }
      console.log(`IP ${ip} успішно збережено.`);
      res.json({ message: "IP збережено" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
