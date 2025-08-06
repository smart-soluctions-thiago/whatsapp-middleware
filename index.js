const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const VERIFY_TOKEN = 'verifica123';

// Rota de verificação do webhook (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log('🟢 WEBHOOK VERIFICADO');
    res.status(200).send(challenge);
  } else {
    console.log('🔴 FALHA NA VERIFICAÇÃO DO WEBHOOK');
    res.sendStatus(403);
  }
});

// Rota para receber mensagens do webhook (POST)
app.post('/webhook', (req, res) => {
  const body = req.body;

  console.log('📩 Requisição recebida do Webhook:');
  console.dir(body, { depth: null });

  res.sendStatus(200); // Confirma recebimento ao Meta
});

// 🔧 Use a porta do Render ou 3000 localmente
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Middleware rodando na porta ${PORT}`);
});
