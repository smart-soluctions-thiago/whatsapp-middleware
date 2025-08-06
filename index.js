const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = "verifica123"; // esse é o mesmo que você colocou no Meta

// Verificação inicial (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("🔐 Verificação do webhook bem-sucedida!");
    res.status(200).send(challenge);
  } else {
    console.warn("❌ Falha na verificação do webhook");
    res.sendStatus(403);
  }
});

// Recebimento de mensagens (POST)
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object) {
    console.log("📥 Webhook recebido:");
    console.dir(body, { depth: null });
    res.sendStatus(200); // envia confirmação pro Meta
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Middleware rodando na porta ${PORT}`);
});
