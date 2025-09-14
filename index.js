const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'Servidor Express funcionando!' });
});

// Rota de exemplo
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'João' },
    { id: 2, name: 'Maria' }
  ]);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});