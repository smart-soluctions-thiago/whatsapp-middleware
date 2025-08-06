// index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Verificação do Webhook (GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "verifica123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("🟢 Verificação do webhook bem-sucedida!");
    res.status(200).send(challenge);
  } else {
    console.warn("🔴 Verificação falhou");
    res.sendStatus(403);
  }
});

// Recebimento de mensagens (POST)
app.post("/webhook", (req, res) => {
  console.log("📥 Webhook recebido:");
  console.dir(req.body, { depth: null });
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Middleware rodando na porta ${PORT}`);
});
