/* eslint-disable no-undef */
const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

// Configuração do servidor Express aqui
app.get('/', async (req, res) => {
    try {
        console.log('CONECTADO!');        
        res.status(200).json({ message: 'Servidor está funcionando!' });
    } catch (e) {
        res.status(500).json({ error: `Ocorreu um erro ao se conectar: ${e}` });
        console.error('Erro ao tentar se conectar:', e);
    }
});